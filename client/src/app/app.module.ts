import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SeatChooserComponent } from './components/seat-chooser/seat-chooser.component';
import { CoasterSearchComponent } from './components/coaster-search/coaster-search.component';
import { CoasterDetailsComponent } from './components/coaster-details/coaster-details.component';
import { CoasterRatingComponent } from './components/coaster-rating/coaster-rating.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SeatChooserComponent,
    CoasterSearchComponent,
    CoasterDetailsComponent,
    CoasterRatingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }