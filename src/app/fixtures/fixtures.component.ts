import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fixture } from '../model/fixtures';
import { map } from 'rxjs';
import { FootballService } from '../services/football.service';
import { ResponseFixture } from '../model/fixtures';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css'],
})
export class FixturesComponent implements OnInit {
  teamFixtures: Fixture[];
  currentLeagueCode: number;
  constructor(
    private footService: FootballService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.currentLeagueCode = +this.route.snapshot.paramMap.get('leaguecode');
      const teamcode = +this.route.snapshot.paramMap.get('teamcode');
      this.footService
        .getFixtuesByTeam(teamcode, this.currentLeagueCode)
        .pipe(
          map((res: ResponseFixture) => {
            return res.response.map((fixture) => {
              return { teams: fixture.teams, goals: fixture.goals };
            });
          })
        )
        .subscribe((response) => {
          console.log(response);
          this.teamFixtures = response;
        });
    });
  }
}
