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
    /*
    let queryStringParams = new URLSearchParams(window.location.search);
    let rcdbId = queryStringParams.get('id');
    
    if (rcdbId) {
      this.http.get(`/rcdb-details/${rcdbId}`)
        .subscribe(result => {

        });
    }
    */

    this.coaster = new Coaster();
    this.coaster.oneStarRatingCount = Math.random() * 50;
    this.coaster.twoStarRatingCount = Math.random() * 30;
    this.coaster.threeStarRatingCount = Math.random() * 40;
    this.coaster.fourStarRatingCount = Math.random() * 50;
    this.coaster.fiveStarRatingCount = Math.random() * 60;
    this.coaster.sixStarRatingCount = Math.random() * 100;
    this.coaster.sevenStarRatingCount = Math.random() * 100;
    this.coaster.eightStarRatingCount = Math.random() * 300;
    this.coaster.nineStarRatingCount = Math.random() * 150;
    this.coaster.tenStarRatingCount = Math.random() * 100;
    this.coaster.name = 'test';

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
  }
}