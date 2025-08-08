import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { LoginRequest } from '../../../models/user.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class Login {
  loginForm: FormGroup;
  hidePassword = signal(true);
  isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      const loginData: LoginRequest = this.loginForm.value;
      
      this.http.post('http://localhost:3000/api/auth/login', loginData).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.isLoading.set(false);
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.isLoading.set(false);
          // Handle error logic here, e.g., show an error message
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.hidePassword.set(!this.hidePassword());
  }
}
