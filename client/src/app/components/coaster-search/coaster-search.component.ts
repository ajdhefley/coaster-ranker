import { Component, OnInit } from '@angular/core';
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

  constructor(private _http: HttpClient) { }

  ngOnInit() {
  }

  search() {
    this.searching = true;
    this._http.get<SearchResult[]>(`/rcdb/results/${this.searchInput}`)
      .subscribe(searchResults => {
        this.searchResults = searchResults;
        this.searching = false;
      });
  }
}