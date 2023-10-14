import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { standingsResponse } from '../model/standings';
import { Observable } from 'rxjs';
import { ResponseFixture } from '../model/fixtures';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FootballService {
  constructor(private http: HttpClient) {}

  getStandingByLeague(leagueCode: number): Observable<standingsResponse> {
    const currentYear = new Date().getFullYear();
    return this.http.get<standingsResponse>(
      'https://v3.football.api-sports.io/standings',
      {
        params: new HttpParams()
          .set('league', leagueCode)
          .set('season', currentYear),
        headers: new HttpHeaders({
          'x-rapidapi-key': environment.API_KEY2,
        }),
      }
    );
  }

  getFixtuesByTeam(
    teamCode: number,
    leagueCode: number
  ): Observable<ResponseFixture> {
    return this.http.get<ResponseFixture>(
      'https://v3.football.api-sports.io/fixtures',
      {
        params: new HttpParams()
          .set('league', leagueCode)
          .set('team', teamCode)
          .set('last', 10)
          .set('status', 'ft'),
        headers: new HttpHeaders({
          'x-rapidapi-key': environment.API_KEY2,
        }),
      }
    );
  }
}
