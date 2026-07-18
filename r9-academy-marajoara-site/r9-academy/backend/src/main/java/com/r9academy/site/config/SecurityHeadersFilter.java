package com.r9academy.site.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Adiciona cabecalhos de seguranca padrao em todas as respostas da API.
 * Reduz a superficie de ataque contra clickjacking, MIME sniffing e
 * vazamento de informacoes por meio do cabecalho Referer.
 */
@Component
public class SecurityHeadersFilter extends HttpFilter {

    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        response.setHeader("X-Content-Type-Options", "nosniff");
        response.setHeader("X-Frame-Options", "DENY");
        response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
        response.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
        response.setHeader("Cache-Control", "no-store");

        chain.doFilter(request, response);
    }
}
