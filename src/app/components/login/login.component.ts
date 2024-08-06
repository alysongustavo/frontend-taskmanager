import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    console.log("Acionou o submit");
    this.authService.login(this.email, this.password).subscribe(
      () => this.router.navigate(['/']),
      error => this.errorMessage = 'Login failed. Please check your credentials.'
    );
  }

}
