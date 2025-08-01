import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LoginRequest } from '../../../models/user.interface';

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

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      const loginData: LoginRequest = this.loginForm.value;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Login attempt:', loginData);
        this.isLoading.set(false);
        // Handle login logic here
      }, 1000);
    }
  }

  togglePasswordVisibility() {
    this.hidePassword.set(!this.hidePassword());
  }
}
