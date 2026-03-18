import { Team } from './Team';
export class Cricketer {
  constructor(
    public cricketerId: number,
    public cricketerName: string, // Test passes string here
    public age: number,
    public nationality: string,
    public experience: number,
    public role: string,
    public runs: number,
    public wickets: number,
    public team: Team
  ) {}
}
