import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  menuAberto = false;
  rolado = false;

  readonly links = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Turmas', href: '#turmas' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Localização', href: '#localizacao' },
    { label: 'Contato', href: '#contato' },
  ];

  get whatsappLink(): string {
    const texto = encodeURIComponent(
      'Olá! Quero saber mais sobre as turmas da R9 Academy Marajoara.'
    );
    return `https://wa.me/${environment.whatsappNumero}?text=${texto}`;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.rolado = window.scrollY > 24;
  }

  alternarMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }
}
