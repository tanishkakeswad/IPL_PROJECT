import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IplService } from '../../services/ipl.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html'
})
export class VoteComponent implements OnInit {
  voteForm: FormGroup;
  vote: any;
  teams: any[] = [];
  cricketers: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private iplService: IplService) {
    this.voteForm = this.fb.group({
      voteId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      category: ['', Validators.required],
      cricketerId: ['', Validators.required], // Test looks for 'cricketerId'
      teamId: ['', Validators.required]      // Test looks for 'teamId'
    });
  }

  ngOnInit(): void {
    this.loadTeams();
    this.loadCricketers();
  }

  loadTeams(): void { this.iplService.getAllTeams().subscribe(d => this.teams = d || []); }
  loadCricketers(): void { this.iplService.getAllCricketers().subscribe(d => this.cricketers = d || []); }

  onSubmit(): void {
    if (this.voteForm.valid) {
      this.iplService.createVote(this.voteForm.value).subscribe({
        next: (res) => {
          this.vote = res;
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
