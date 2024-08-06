import {Router, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {inject} from "@angular/core";
import {AuthService} from "./services/auth.service";

export const routes: Routes = [
  { path: '', component: HomeComponent,
    canActivate: [
      () => {
        const authService = inject(AuthService);
        const router = inject(Router);
        if (authService.isAuthenticated()) {
          return true;
        } else {
          router.navigate(['/login']);
          return false;
        }
      }
    ]
  }, // Rota padrão
  { path: 'login', component: LoginComponent }, // Rota de login
  { path: '**', redirectTo: '' } // Rota curinga para redirecionar para a rota padrão se a rota não for encontrada
];
