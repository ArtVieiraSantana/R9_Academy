package com.r9academy.site.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Libera o acesso da API apenas para as origens do frontend da R9 Academy
 * Marajoara.
 *
 * IMPORTANTE (seguranca): em producao, troque "allowedOriginPatterns" pelo(s)
 * dominio(s) reais do site (ex: https://r9academymarajoara.com.br) e remova os
 * dominios de preview/teste assim que o deploy definitivo estiver no ar. Nunca
 * use "*" em conjunto com allowCredentials.
 */
@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOriginPatterns(
                                "http://localhost:4200",
                                "https://*.netlify.app",
                                "https://*.vercel.app",
                                "https://*.github.io",
                                "https://*.onrender.com",
                                "https://r9academymarajoara.com.br",
                                "https://www.r9academymarajoara.com.br"
                        )
                        .allowedMethods("GET", "POST", "OPTIONS")
                        .allowedHeaders("Content-Type", "Accept")
                        .maxAge(3600);
            }
        };
    }
}
