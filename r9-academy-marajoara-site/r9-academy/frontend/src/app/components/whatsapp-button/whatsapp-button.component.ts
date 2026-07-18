import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.scss',
})
export class WhatsappButtonComponent {
  private readonly numero = environment.whatsappNumero;
  private readonly mensagemPadrao =
    'Olá! Quero saber mais sobre as turmas da R9 Academy Marajoara.';

  get link(): string {
    return `https://wa.me/${this.numero}?text=${encodeURIComponent(
      this.mensagemPadrao
    )}`;
  }
}
