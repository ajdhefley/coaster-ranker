import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SearchResult } from 'src/app/models/search-result.model';

@Component({
  selector: 'app-coaster-search',
  templateUrl: './coaster-search.component.html',
  styleUrls: ['./coaster-search.component.scss']
})
export class CoasterSearchComponent implements OnInit {
  searching: boolean;
  searchInput: string;
  searchResults: SearchResult[];

  constructor(private _http: HttpClient, private _router: Router) { }

  ngOnInit() {
    let searchParam = new URLSearchParams(window.location.search).get('q');
    if (searchParam) {
      this.searchInput = searchParam;
      this.fetchResults();
    }
  }

  search() {
    this._router.navigate(['/search'], {
      queryParams: { q: this.searchInput }
    });
    this.fetchResults();
  }

  private fetchResults() {
    this.searching = true;
    this._http.get<SearchResult[]>(`/rcdb/results/${this.searchInput}`)
      .subscribe(searchResults => {
        this.searchResults = searchResults;
        this.searching = false;
      });
  }
}