import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GoogleChartsModule } from 'angular-google-charts';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TimeseriesComponent } from './timeseries/timeseries.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'timeseries',
    component: TimeseriesComponent
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
  
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TimeseriesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    GoogleChartsModule,
    RouterModule.forRoot(
      routes
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
