import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cricketerarray',
  // Ensure these filenames match the EXACT casing in your folder
  templateUrl: './cricketerarray.component.html', 
  styleUrls: ['./cricketerarray.component.scss']
})
export class CricketerArrayComponent implements OnInit {
  cricketers: any[] = [];
  showCricketers: boolean = true;

  ngOnInit() {
    this.cricketers = [
      { cricketerId: 1, teamId: 1, cricketerName: 'Virat Kohli', age: 35, nationality: 'Indian', experience: 15, role: 'Batsman', totalRuns: 7000, totalWickets: 4 },
      { cricketerId: 2, teamId: 2, cricketerName: 'AB de Villiers', age: 39, nationality: 'South African', experience: 17, role: 'Batsman', totalRuns: 5000, totalWickets: 2 },
      { cricketerId: 3, teamId: 1, cricketerName: 'Rohit Sharma', age: 36, nationality: 'Indian', experience: 15, role: 'Batsman', totalRuns: 6000, totalWickets: 15 },
      { cricketerId: 4, teamId: 3, cricketerName: 'MS Dhoni', age: 42, nationality: 'Indian', experience: 20, role: 'Wicketkeeper', totalRuns: 5000, totalWickets: 0 }
    ];
  }

  toggleCricketers() {
    this.showCricketers = !this.showCricketers;
  }


}
