import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IplService } from '../../services/ipl.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html'
})
export class VoteComponent implements OnInit {
  voteForm!: FormGroup;
  teams: any[] = [];
  cricketers: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private iplService: IplService) {
   
  }
  loadTeams(){
    this.iplService.getAllTeams().subscribe(d => this.teams = d || []);
  }
  loadCricketers(){
 this.iplService.getAllCricketers().subscribe(d => this.cricketers = d || []);
  }
  ngOnInit(): void {
     this.voteForm = this.fb.group({
      // Test uses .setValue() on these exact keys
      voteId: [null], 
      email: ['', [Validators.required, Validators.email]],
      category: ['', Validators.required],
      cricketerId: [null, Validators.required],
      teamId: [null, Validators.required]
    });
    this.loadCricketers();
    this.loadTeams();
   
  }

  onSubmit(): void {
    if (this.voteForm.valid) {
      this.iplService.getAllVotes().subscribe((data)=>{
        this.voteForm.get('voteId')?.setValue(data.length+1);
      })
      this.iplService.createVote(this.voteForm.value).subscribe({
        next: () => {
          
          this.successMessage = 'Vote casted successfully!';
          this.errorMessage = '';
          this.voteForm.reset();
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.successMessage = '';
    }
  }
}

