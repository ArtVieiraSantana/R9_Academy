package com.r9academy.site.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactRequest {

    @NotBlank(message = "Informe o nome do responsavel.")
    @Size(max = 120)
    private String nome;

    @NotBlank(message = "Informe um telefone/WhatsApp para retorno.")
    @Size(max = 30)
    private String telefone;

    @Email(message = "Informe um e-mail valido.")
    @Size(max = 150)
    private String email;

    @NotBlank(message = "Escreva uma mensagem.")
    @Size(max = 1000)
    private String mensagem;

    /**
     * Campo "honeypot" (armadilha para robôs). Fica invisível para pessoas no
     * formulário; se vier preenchido, é sinal de que quem enviou é um bot, e
     * a mensagem é descartada silenciosamente no controller.
     */
    @Size(max = 200)
    private String site;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }
}
