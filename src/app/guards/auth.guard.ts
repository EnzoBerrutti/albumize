import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/interfaces';
import { Observable, tap } from 'rxjs';

function checkAuthStatus(): boolean | Observable<boolean>{
  const authService = inject(AuthService);
  const  router = inject(Router);
  const user:User | undefined = authService.currentUser

  return authService.checkStatusAutenticacion()
                    .pipe(
                      tap( estaAutenticado => {
                        if(!estaAutenticado) 
                        {
                          console.log(estaAutenticado)
                          router.navigate(['home/1'])
                        }
                      } )
                    )
}
export const authGuard = () => {
  return true;
};
