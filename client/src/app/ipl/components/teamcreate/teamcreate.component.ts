import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-teamcreate',
  templateUrl: './teamcreate.component.html',
  styleUrls: ['./teamcreate.component.scss']
})
export class TeamCreateComponent implements OnInit {
  teamForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit() {
    this.teamForm = new FormGroup({
      teamId: new FormControl('', Validators.required),
      teamName: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      ownerName: new FormControl('', Validators.required),
      establishmentYear: new FormControl(new Date().getFullYear(), Validators.required)
    });
  }

  onSubmit() {
    if (this.teamForm.valid) {
      this.successMessage = 'Team has been successfully created!';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.successMessage = '';
    }
  }

  resetForm() {
    this.teamForm.reset({
      teamId: null,          
      teamName: '',         
      location: '',          
      ownerName: '',         
      establishmentYear: new Date().getFullYear() 
    });

    // this.successMessage = "";
    // this.errorMessage = "";
  }






}
