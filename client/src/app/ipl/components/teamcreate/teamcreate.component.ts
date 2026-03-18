import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IplService } from '../../services/ipl.service';
//import { IplService } from '../services/ipl.service';

@Component({
selector: 'app-teamcreate',
templateUrl: './teamcreate.component.html',
styleUrls: []
})
export class TeamCreateComponent implements OnInit {

teamForm!: FormGroup;
successMessage: string |null=null;
errorMessage: string |null=null;
currentYear: number = new Date().getFullYear();

constructor(private fb: FormBuilder, private iplService: IplService) {}

ngOnInit(): void {
this.teamForm = this.fb.group({
//teamId: 0, // :white_check_mark: IMPORTANT FIX
teamName: ['', Validators.required],
location: ['', Validators.required],
ownerName: ['', [Validators.required, Validators.minLength(2)]],
establishmentYear: ['', [
Validators.required,
Validators.min(1900),
Validators.max(this.currentYear)
]]
});
}

onSubmit(): void {

if (this.teamForm.invalid) {
this.errorMessage = 'Please fill out all required fields correctly.';
this.successMessage = null;
return;
}

const response = this.iplService.addTeam(this.teamForm.value);

if (response && response.subscribe) {
response.subscribe(() => {
this.successMessage = 'Team created successfully!';
this.errorMessage = null;
});
}
}
}