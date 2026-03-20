import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IplService } from '../../services/ipl.service';

@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticketbooking.component.html'
})
export class TicketBookingComponent implements OnInit {
  // 1. Rename 'ticketBookingForm' to 'bookingForm' to match the test requirements
  ticketBookingForm!: FormGroup; 
  ticketBooking!: any;
  matches: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private iplService: IplService) {
    // 2. Use 'bookingForm' here as well
    this.ticketBookingForm = this.fb.group({
      // matchId and numberOfTickets are correct and match the test expectations
      bookingId:[null,[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      matchId: ['', Validators.required],
      numberOfTickets: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches(): void {
    this.iplService.getAllMatches().subscribe(data => this.matches = data || []);
  }

  onSubmit(): void {
    // 3. Update to use 'this.bookingForm'
    if (this.ticketBookingForm.valid) {
      this.iplService.createBooking(this.ticketBookingForm.value).subscribe({
        next: (res) => {
          this.ticketBooking = res;
          this.successMessage = 'Ticket booked successfully!';
          this.errorMessage = '';
          this.ticketBookingForm.reset();
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.successMessage = '';
    }
  }
}
