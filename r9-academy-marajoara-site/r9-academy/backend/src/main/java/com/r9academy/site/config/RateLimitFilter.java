package com.r9academy.site.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Limitador de requisicoes simples (por IP) para o endpoint publico de
 * contato, evitando spam e ataques de forca bruta/DoS basico.
 *
 * Regra: no maximo {@link #LIMITE_POR_JANELA} requisicoes por IP a cada
 * {@link #JANELA_SEGUNDOS} segundos. Nao substitui um WAF/API gateway em
 * producao, mas oferece uma primeira barreira sem dependencias externas.
 */
@Component
public class RateLimitFilter extends HttpFilter {

    private static final int LIMITE_POR_JANELA = 8;
    private static final long JANELA_SEGUNDOS = 60;

    private final ConcurrentHashMap<String, Janela> contadores = new ConcurrentHashMap<>();

    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        if (!"/api/contato".equals(request.getRequestURI()) || !"POST".equalsIgnoreCase(request.getMethod())) {
            chain.doFilter(request, response);
            return;
        }

        String ip = obterIpCliente(request);
        long agora = Instant.now().getEpochSecond();

        Janela janela = contadores.compute(ip, (chave, atual) -> {
            if (atual == null || agora - atual.inicio > JANELA_SEGUNDOS) {
                return new Janela(agora, new AtomicInteger(1));
            }
            atual.contagem.incrementAndGet();
            return atual;
        });

        if (janela.contagem.get() > LIMITE_POR_JANELA) {
            response.setStatus(429);
            response.setContentType("application/json");
            response.getWriter().write(
                    "{\"sucesso\":false,\"mensagem\":\"Muitas tentativas. Aguarde um minuto e tente novamente, ou fale pelo WhatsApp.\"}"
            );
            return;
        }

        chain.doFilter(request, response);
    }

    private String obterIpCliente(HttpServletRequest request) {
        String encaminhadoPor = request.getHeader("X-Forwarded-For");
        if (encaminhadoPor != null && !encaminhadoPor.isBlank()) {
            return encaminhadoPor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    private static final class Janela {
        final long inicio;
        final AtomicInteger contagem;

        Janela(long inicio, AtomicInteger contagem) {
            this.inicio = inicio;
            this.contagem = contagem;
        }
    }
}
