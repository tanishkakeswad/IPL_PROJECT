import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IplService } from '../../services/ipl.service';

@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticketbooking.component.html'
})
export class TicketBookingComponent implements OnInit {

  ticketBookingForm!: FormGroup;
  ticketBooking: any;
  matches: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private iplService: IplService) { }

  ngOnInit(): void {
    this.ticketBookingForm = this.fb.group({
      bookingId:[''],
      matchId:null,
      email: ['', [Validators.required, Validators.email]],
      match: ['', Validators.required],
      numberOfTickets: ['', [Validators.required, Validators.min(1)]]
    });

    this.loadMatches();
  }

  loadMatches(): void {
    this.iplService.getAllMatches().subscribe(data => {
      this.matches = data || [];
    });
  }

  onSubmit(): void {
    if (this.ticketBookingForm.valid) {
      this.iplService.createBooking(this.ticketBookingForm.value).subscribe(res => {
        this.ticketBooking = res;
        this.successMessage = 'Ticket booked successfully!';
        this.errorMessage = '';
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.successMessage = '';
    }
  }
}
