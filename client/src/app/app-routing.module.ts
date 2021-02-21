import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoasterDetailsComponent } from './components/coaster-details/coaster-details.component';
import { CoasterSearchComponent } from './components/coaster-search/coaster-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: CoasterSearchComponent },
  { path: 'coaster', component: CoasterDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }