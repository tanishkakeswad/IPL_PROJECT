import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cricketercreate',
  templateUrl: './cricketercreate.component.html',
  styleUrls: ['./cricketercreate.component.scss']
})
export class CricketerCreateComponent implements OnInit {
  cricketerForm!: FormGroup;
  cricketer: any; // Added for Test 2
  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit() {
    this.cricketerForm = new FormGroup({
      cricketerId: new FormControl(null, Validators.required),
      teamId: new FormControl(null, Validators.required),
      cricketerName: new FormControl('', Validators.required),
      age: new FormControl(null, [Validators.required, Validators.min(15)]),
      nationality: new FormControl('', Validators.required),
      experience: new FormControl(null, Validators.required),
      role: new FormControl('', Validators.required),
      totalRuns: new FormControl(null, [Validators.required, Validators.min(0)]),
      totalWickets: new FormControl(null, [Validators.required, Validators.min(0)])
    });
  }

  onSubmit() {
    if (this.cricketerForm.valid) {
      this.cricketer = this.cricketerForm.value; // Store the object for the test
      this.successMessage = 'Cricketer created successfully!';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.successMessage = '';
    }
  }

  resetForm() {
    this.cricketerForm.reset();
    // Explicitly set ID to null for Test 3
    this.cricketerForm.patchValue({ cricketerId: null });
    this.cricketer = null;
    this.successMessage = '';
    this.errorMessage = '';
  }
}
