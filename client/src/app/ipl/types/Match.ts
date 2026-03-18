import { Team } from './Team';
export class Match {
  constructor(
    public matchId: number,
    public team1: Team, // Test passes Team object here
    public team2: Team,
    public matchDate: Date,
    public venue: string,
    public result: string,
    public status: string,
    public winnerTeam: Team
  ) {}
}
