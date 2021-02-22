import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coaster } from 'src/app/models/coaster.model';

@Component({
  selector: 'app-coaster-details',
  templateUrl: './coaster-details.component.html',
  styleUrls: ['./coaster-details.component.scss']
})
export class CoasterDetailsComponent implements OnInit {
  coaster: Coaster;
  displayAvgRating: string;
  ratingCounts: number[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadCoaster();
  }

  private loadCoaster() {
    let queryStringParams = new URLSearchParams(window.location.search);
    let rcdbId = queryStringParams.get('id');
    
    if (rcdbId) {
      this.http.get<Coaster>(`/rcdb/details/${rcdbId}`)
        .subscribe(result => {
          this.coaster = result;
          this.ratingCounts = [
            this.coaster.oneStarRatingCount,
            this.coaster.twoStarRatingCount,
            this.coaster.threeStarRatingCount,
            this.coaster.fourStarRatingCount,
            this.coaster.fiveStarRatingCount,
            this.coaster.sixStarRatingCount,
            this.coaster.sevenStarRatingCount,
            this.coaster.eightStarRatingCount,
            this.coaster.nineStarRatingCount,
            this.coaster.tenStarRatingCount
          ];
        });
    }
  }
}