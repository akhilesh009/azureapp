import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { GoogleChartsModule } from 'angular-google-charts';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TimeseriesComponent } from './timeseries/timeseries.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatTreeModule, MatIconModule, MatButtonModule , MatSnackBarModule} from '@angular/material';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule, MatInputModule,MatNativeDateModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TreeviewModule } from 'ngx-treeview';



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
    BrowserAnimationsModule,
    GoogleChartsModule,
    MatTreeModule, MatIconModule, MatButtonModule,MatProgressBarModule,MatSnackBarModule,
    MatDatepickerModule, MatInputModule,MatNativeDateModule,HttpClientModule,FormsModule,
    TreeviewModule.forRoot(),
    RouterModule.forRoot(
      routes
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [MatProgressBarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
