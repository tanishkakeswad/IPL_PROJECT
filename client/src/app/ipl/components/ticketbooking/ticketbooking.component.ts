import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticketbooking.component.html',
  styleUrls: ['./ticketbooking.component.scss']
})
export class TicketBookingComponent {
  ticketBookingForm: FormGroup; // Renamed from bookingForm to match test
  ticketBooking: any; // Added: The test expects this property
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.ticketBookingForm = this.fb.group({
      bookingId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      matchId: ['', Validators.required],
      numberOfTickets: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.ticketBookingForm.valid) {
      this.ticketBooking = this.ticketBookingForm.value; // Store the object
      this.successMessage = 'Tickets booked successfully!';
      this.errorMessage = '';
      this.resetForm();
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.successMessage = '';
    }
  }

  resetForm(): void {
    this.ticketBookingForm.reset();
  }
}

