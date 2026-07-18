import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface ItemGaleria {
  tipo: 'foto' | 'placeholder';
  src?: string;
  legenda: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  readonly itens: ItemGaleria[] = [
    {
      tipo: 'foto',
      src: 'assets/fachada-r9-academy-marajoara.png',
      legenda: 'Fachada da R9 Academy Marajoara',
    },
    { tipo: 'placeholder', legenda: 'Treino técnico de finalização' },
    { tipo: 'placeholder', legenda: 'Dia de jogo no campo do Marajoara' },
    { tipo: 'placeholder', legenda: 'Confraternização com as famílias' },
    { tipo: 'placeholder', legenda: 'Coletivo das categorias de base' },
    { tipo: 'placeholder', legenda: 'Premiação de fim de temporada' },
  ];
}
