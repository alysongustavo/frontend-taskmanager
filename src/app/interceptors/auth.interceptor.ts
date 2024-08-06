import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {HttpInterceptorFn} from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authToken = inject(AuthService).getToken();

  console.log("Bateu aquiiii: "+authToken);

  if (!authToken) {
    // Se o token não existe, redireciona para a rota de login
    router.navigate(['/login']);
    // Interrompe a requisição
    return next(req);
  }

  // Clona a requisição para adicionar o cabeçalho de autenticação
  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`)
  });

  return next(newReq);

}
