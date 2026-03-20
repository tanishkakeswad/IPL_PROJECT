import { Component, OnInit } from '@angular/core';
import { IplService } from '../../services/ipl.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
// src/app/ipl/components/dashboard/dashboard.component.ts
export class DashboardComponent implements OnInit {
  emailForm: FormGroup;        // MUST be named emailForm
  ticketsBooked: any[] = [];   // MUST be named ticketsBooked
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private iplService: IplService) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmitEmail(): void {     // MUST be named onSubmitEmail
    if (this.emailForm.valid) {
      const email = this.emailForm.get('email')?.value;
      this.iplService.getBookingsByUserEmail(email).subscribe((res) => {
        this.ticketsBooked = res || [];
      });
    }
  }
}
