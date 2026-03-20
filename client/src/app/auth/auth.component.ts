import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isLoginMode = true; // Toggle between Login and Signup
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER'] // Default role
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const { email, role } = this.authForm.value;
    
    // Simulate Authentication Logic
    // In a real app, you would call authService.login(email, password)
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);

    // Navigate based on role
    if (role === 'ADMIN') {
      this.router.navigate(['/ipl/dashboard']); // Admin Dashboard
    } else {
      this.router.navigate(['/ipl/dashboard']); // User Dashboard (role-based logic inside)
    }
  }
}
