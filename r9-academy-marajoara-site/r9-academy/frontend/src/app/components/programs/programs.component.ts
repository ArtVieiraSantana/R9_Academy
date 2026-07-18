import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface Turma {
  numero: string;
  nome: string;
  idade: string;
  horario: string;
  foco: string;
}

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss',
})
export class ProgramsComponent {
  readonly turmas: Turma[] = [
    {
      numero: '06',
      nome: 'Sub-7',
      idade: '5 a 7 anos',
      horario: 'Ter e Qui · 9h às 10h',
      foco: 'Coordenação motora e primeiro contato com a bola',
    },
    {
      numero: '09',
      nome: 'Sub-11',
      idade: '8 a 11 anos',
      horario: 'Seg, Qua e Sex · 15h às 16h30',
      foco: 'Fundamentos técnicos e jogo em equipe',
    },
    {
      numero: '14',
      nome: 'Sub-15',
      idade: '12 a 15 anos',
      horario: 'Seg, Qua e Sex · 17h às 19h',
      foco: 'Tática, competitividade e preparação física',
    },
    {
      numero: '18',
      nome: 'Sub-20',
      idade: '16 a 20 anos',
      horario: 'Ter, Qui e Sáb · 8h às 10h',
      foco: 'Alto rendimento técnico e preparação para peneiras',
    },
  ];
}
