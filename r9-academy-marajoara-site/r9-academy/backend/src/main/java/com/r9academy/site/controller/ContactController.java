package com.r9academy.site.controller;

import com.r9academy.site.dto.ContactRequest;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Endpoint de contato da R9 Academy Marajoara.
 * Nao existe banco de dados: a mensagem e validada e registrada no log do
 * servidor. Se no futuro quiser receber por e-mail, basta injetar um
 * JavaMailSender aqui dentro do metodo receberMensagem().
 */
@RestController
@RequestMapping("/api")
public class ContactController {

    private static final Logger log = LoggerFactory.getLogger(ContactController.class);

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "servico", "R9 Academy Marajoara - API",
                "horario", LocalDateTime.now().toString()
        ));
    }

    @PostMapping("/contato")
    public ResponseEntity<Map<String, Object>> receberMensagem(@Valid @RequestBody ContactRequest dados) {
        // Honeypot: se o campo oculto "site" vier preenchido, é robô.
        // Respondemos como sucesso para não revelar a defesa, mas ignoramos o conteúdo.
        if (dados.getSite() != null && !dados.getSite().isBlank()) {
            log.warn("Envio de contato bloqueado por honeypot (provável bot).");
            return ResponseEntity.ok(Map.of(
                    "sucesso", true,
                    "mensagem", "Recebemos sua mensagem! Nossa equipe vai te responder em breve."
            ));
        }

        log.info("Novo contato recebido | nome={} | telefone={} | email={} | mensagem={}",
                sanitizarParaLog(dados.getNome()),
                sanitizarParaLog(dados.getTelefone()),
                sanitizarParaLog(dados.getEmail()),
                sanitizarParaLog(dados.getMensagem()));

        return ResponseEntity.ok(Map.of(
                "sucesso", true,
                "mensagem", "Recebemos sua mensagem! Nossa equipe vai te responder em breve."
        ));
    }

    /**
     * Remove quebras de linha e caracteres de controle antes de gravar no log,
     * evitando ataques de "log forging" (injeção de entradas falsas no log).
     */
    private String sanitizarParaLog(String valor) {
        if (valor == null) {
            return "";
        }
        return valor.replaceAll("[\\r\\n\\t]", " ").trim();
    }
}
