import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private router: Router) { }
  onAboutClick() {
    // Navega a la ruta "about"
    this.router.navigate(['/about'])
      .then(() => {
        // Espera 100 milisegundos (ajusta según sea necesario) y luego recarga la página
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });

}
}
