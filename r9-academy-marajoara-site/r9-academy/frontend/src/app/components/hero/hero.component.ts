import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  get whatsappLink(): string {
    const texto = encodeURIComponent(
      'Olá! Quero matricular meu filho(a) na R9 Academy Marajoara.'
    );
    return `https://wa.me/${environment.whatsappNumero}?text=${texto}`;
  }
}
