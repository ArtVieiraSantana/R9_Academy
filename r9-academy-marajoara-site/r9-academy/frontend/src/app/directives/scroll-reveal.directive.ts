import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  AfterViewInit,
  Renderer2,
} from '@angular/core';

/**
 * Revela o elemento (fade + slide) quando ele entra na tela.
 * Uso: <div appScrollReveal [revealDelay]="150">...</div>
 * Respeita "prefers-reduced-motion".
 */
@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealDelay = 0;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    this.renderer.addClass(this.el.nativeElement, 'reveal-init');

    if (prefersReducedMotion) {
      this.renderer.addClass(this.el.nativeElement, 'reveal-visible');
      return;
    }

    this.renderer.setStyle(
      this.el.nativeElement,
      'transition-delay',
      `${this.revealDelay}ms`
    );

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.el.nativeElement, 'reveal-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
