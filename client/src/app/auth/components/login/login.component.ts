import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Ensure correct path
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    successMessage = '';
    errorMessage = '';

    constructor(
        private fb: FormBuilder, 
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        // Test 6 requires username and password fields with validators
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit() {
        this.successMessage = '';
        this.errorMessage = '';

        // Test 7: Ensure authService.login is NOT called if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        // Test 8: Ensure authService.login IS called with form values
        this.authService.login(this.loginForm.value).subscribe({
            next: (response) => {
                this.successMessage = 'Login successful!';
                // Redirect based on role or to home
                this.router.navigate(['/ipl/teams']);
            },
            error: (err) => {
                this.errorMessage = 'Invalid username or password.';
            }
        });
    }
}
