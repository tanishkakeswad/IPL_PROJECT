import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-matchcreate',
  templateUrl: './matchcreate.component.html',
  styleUrls: ['./matchcreate.component.scss']
})
export class MatchCreateComponent implements OnInit {
  matchForm!: FormGroup;
  match: any; // Added for Test 5
  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit() {
    this.matchForm = new FormGroup({
      matchId: new FormControl(null, Validators.required),
      firstTeamId: new FormControl(null, Validators.required),
      secondTeamId: new FormControl(null, Validators.required),
      matchDate: new FormControl('', Validators.required),
      venue: new FormControl('', Validators.required),
      result: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      winnerTeamId: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.matchForm.valid) {
      this.match = this.matchForm.value; // Store the object for the test
      this.successMessage = 'Match created successfully!';
      this.errorMessage = '';
      this.matchForm.reset(); // Test 5 requires reset on success
      this.matchForm.patchValue({ matchId: null });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.successMessage = '';
    }
  }

  resetForm() {
    this.matchForm.reset();
    // Explicitly set ID to null for Test 6
    this.matchForm.patchValue({ matchId: null });
    this.match = null;
    this.successMessage = '';
    this.errorMessage = '';
  }
}
