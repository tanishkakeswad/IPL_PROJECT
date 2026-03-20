import { Injectable } from "@angular/core";
//import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Team } from "../types/Team";
import { Cricketer } from "../types/Cricketer";
import { Match } from "../types/Match";
import { Vote } from "../types/Vote";
import { TicketBooking } from "../types/TicketBooking";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class IplService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // Backend API calls of Team
  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/teams`, team);
  }

  updateTeam(team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}/teams`, team);
  }

  deleteTeam(teamId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/teams/${teamId}`);
  }

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/teams`);
  }

  getTeamById(teamId: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/teams/${teamId}`);
  }

  // Backend API calls of Cricketer
  addCricketer(cricketer: Cricketer): Observable<Cricketer> {
    return this.http.post<Cricketer>(`${this.baseUrl}/cricketers`, cricketer);
  }

  updateCricketer(cricketer: Cricketer): Observable<Cricketer> {
    return this.http.put<Cricketer>(`${this.baseUrl}/cricketers`, cricketer);
  }

  deleteCricketer(cricketerId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cricketers/${cricketerId}`);
  }

  getAllCricketers(): Observable<Cricketer[]> {
    return this.http.get<Cricketer[]>(`${this.baseUrl}/cricketers`);
  }

  getCricketerById(cricketerId: number): Observable<Cricketer> {
    return this.http.get<Cricketer>(`${this.baseUrl}/cricketers/${cricketerId}`);
  }

  getCricketersByTeam(teamId: number): Observable<Cricketer[]> {
    return this.http.get<Cricketer[]>(`${this.baseUrl}/cricketers/team/${teamId}`);
  }

  // Backend API calls of Match
  addMatch(match: Match): Observable<Match> {
    return this.http.post<Match>(`${this.baseUrl}/matches`, match);
  }

  updateMatch(match: Match): Observable<Match> {
    return this.http.put<Match>(`${this.baseUrl}/matches`, match);
  }

  deleteMatch(matchId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/matches/${matchId}`);
  }

  getAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.baseUrl}/matches`);
  }

  getMatchById(matchId: number): Observable<Match> {
    return this.http.get<Match>(`${this.baseUrl}/matches/${matchId}`);
  }

  getAllMatchesByStatus(status: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/matches/status/${status}`);
  }

  
  getAllVotes(): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.baseUrl}/votes`);
  }
  
  createVote(vote: Vote): Observable<Vote> {
    return this.http.post<Vote>(`${this.baseUrl}/votes`, vote);
  }
  
  getVotesCountOfAllCategories(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/votes/count`);
  }

  // Backend API calls of TicketBooking
  getAllTicketBookings(): Observable<TicketBooking[]> {
    return this.http.get<TicketBooking[]>(`${this.baseUrl}/bookings`);
  }
    
  createBooking(ticketBooking: TicketBooking): Observable<TicketBooking> {
    return this.http.post<TicketBooking>(`${this.baseUrl}/bookings`, ticketBooking);
  }
    
  cancelBooking(bookingId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/bookings/${bookingId}`);
  }

  getBookingsByUserEmail(email: string): Observable<TicketBooking[]> {
    return this.http.get<TicketBooking[]>(`${this.baseUrl}/bookings/user/${email}`);
  }
}

