import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { User } from "../../ipl/types/User";
import { environment } from "../../../environments/environment.development";
//import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  login(user: Partial<User>): Observable<{ [key: string]: string }> {
    // The test expects a POST to /user/login
    return this.http.post<{ [key: string]: string }>(`${this.baseUrl}/login`, user).pipe(
      tap(res => {
        if (res && res['token']) {
          localStorage.setItem('token', res['token']);
          // Optional: Store role if your backend provides it
          if (res['role']) localStorage.setItem('role', res['role']);
        }
      })
    );
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/all`);
  }

  createUser(user: User): Observable<User> {
    // The test expects a POST to /user/register
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }

  logout(): void {
    localStorage.clear();
  }
}
