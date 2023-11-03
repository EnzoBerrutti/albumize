import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  state('void', style({ opacity: 0 })), // Estado inicial: completamente transparente
  transition(':enter, :leave', [ // Transición al entrar y al salir
    animate(800, style({ opacity: 1 })), // Animación de 300ms para cambiar la opacidad
  ]),
]);