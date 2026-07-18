import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ContactService } from '../../services/contact.service';
import { environment } from '../../../environments/environment';

type EstadoEnvio = 'idle' | 'enviando' | 'sucesso' | 'erro';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScrollRevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  estado: EstadoEnvio = 'idle';
  mensagemErro = '';

  formulario: ReturnType<FormBuilder['group']>;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(120)]],
      telefone: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      mensagem: ['', [Validators.required, Validators.maxLength(1000)]],
      // Honeypot: campo invisível para humanos; se vier preenchido, é bot.
      site: ['', [Validators.maxLength(200)]],
    });
  }

  get whatsappLink(): string {
    const texto = encodeURIComponent(
      'Olá! Quero saber mais sobre as turmas da R9 Academy Marajoara.'
    );
    return `https://wa.me/${environment.whatsappNumero}?text=${texto}`;
  }

  campoInvalido(campo: string): boolean {
    const controle = this.formulario.get(campo);
    return !!controle && controle.invalid && (controle.dirty || controle.touched);
  }

  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.estado = 'enviando';
    this.mensagemErro = '';

    const dados = {
      nome: this.formulario.value.nome ?? '',
      telefone: this.formulario.value.telefone ?? '',
      email: this.formulario.value.email ?? '',
      mensagem: this.formulario.value.mensagem ?? '',
      site: this.formulario.value.site ?? '',
    };

    this.contactService.enviar(dados).subscribe({
      next: () => {
        this.estado = 'sucesso';
        this.formulario.reset();
      },
      error: () => {
        this.estado = 'erro';
        this.mensagemErro =
          'Não foi possível enviar agora. Tente novamente ou fale direto pelo WhatsApp.';
      },
    });
  }
}
