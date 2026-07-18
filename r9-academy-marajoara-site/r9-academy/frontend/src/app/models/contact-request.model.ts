export interface ContactRequest {
  nome: string;
  telefone: string;
  email: string;
  mensagem: string;
  /** Campo honeypot (anti-spam): deve ficar sempre vazio para envios legítimos. */
  site?: string;
}

export interface ContactResponse {
  sucesso: boolean;
  mensagem?: string;
  erros?: Record<string, string>;
}
