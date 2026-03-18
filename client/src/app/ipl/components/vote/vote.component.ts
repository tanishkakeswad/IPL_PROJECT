import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent {
  voteForm: FormGroup;
  vote: any; // Added: The test expects this property
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.voteForm = this.fb.group({
      voteId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      category: ['', Validators.required],
      cricketerId: ['', Validators.required],
      teamId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.voteForm.valid) {
      this.vote = this.voteForm.value; // Store the object for the test
      this.successMessage = 'Vote submitted successfully!'; // Exact string match
      this.errorMessage = '';
      this.resetForm();
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.'; // Exact string match
      this.successMessage = '';
    }
  }

  resetForm(): void {
    this.voteForm.reset();
  }
}
