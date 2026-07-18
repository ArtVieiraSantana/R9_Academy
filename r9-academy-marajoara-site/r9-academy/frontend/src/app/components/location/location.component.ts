import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  readonly mapaUrl: SafeResourceUrl;

  constructor(sanitizer: DomSanitizer) {
    const query = encodeURIComponent(
      'R. Marcelino Zonta, 316 - Vila Sofia, São Paulo - SP, 04688-000'
    );
    this.mapaUrl = sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps?q=${query}&output=embed`
    );
  }
}
