import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  role: string | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Retrieves role to show/hide admin links in the template
    this.role = localStorage.getItem('role');
  }

  logout(): void {
    // Task 2 requirement: Clear session and redirect
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
