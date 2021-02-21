import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-coaster-rating',
  templateUrl: './coaster-rating.component.html',
  styleUrls: ['./coaster-rating.component.scss']
})
export class CoasterRatingComponent implements OnInit {
  @Input() ratingCounts: number[];

  displayAvgRating: string;
  stars: any[];
  halfStars: any[];
  emptyStars: any[];

  constructor() { }

  ngOnInit() {
    this.setStars();
  }

  private setStars() {
    let ratingSum = 0;
    let totalCount = 0;

    this.ratingCounts.forEach((count, index) => {
      ratingSum += count * (index + 1);
      totalCount += count;
    });

    this.displayAvgRating = (ratingSum / totalCount).toFixed(1);

    let displayAvgRatingSplit = this.displayAvgRating.split('.');
    this.stars = new Array(parseInt(displayAvgRatingSplit[0]));
    this.halfStars = new Array();
    
    if (parseInt(displayAvgRatingSplit[1]) > 8)
      this.stars.push(0);
    else if (parseInt(displayAvgRatingSplit[1]) > 2)
      this.halfStars.push(0);

    this.emptyStars = new Array(this.ratingCounts.length - this.stars.length - this.halfStars.length);
  }
}