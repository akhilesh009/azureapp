import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';




import {Observable} from 'rxjs';


@Component({
  selector: 'app-timeseries',
  templateUrl: './timeseries.component.html',
  styleUrls: ['./timeseries.component.css']
})
export class TimeseriesComponent implements OnInit {

   constructor(private http:HttpClient ) { }

   grpahData = [];

   ngOnInit() 
   {
      

      let headers = new HttpHeaders(); 
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiIxMjBkNjg4ZC0xNTE4LTRjZjctYmQzOC0xODJmMTU4ODUwYjYiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83NmEyYWU1YS05ZjAwLTRmNmItOTVlZC01ZDMzZDc3YzRkNjEvIiwiaWF0IjoxNTYxNjM4NTQ3LCJuYmYiOjE1NjE2Mzg1NDcsImV4cCI6MTU2MTY0MjQ0NywiYWlvIjoiNDJaZ1lPaWJwTGkram5YZHRndGhiWGNzTy9oczNNN3BuOU42WjJUU0puNUI5OWN6dGh3QSIsImFtciI6WyJ3aWEiXSwiZmFtaWx5X25hbWUiOiJTaGV0ZSIsImdpdmVuX25hbWUiOiJBa2hpbGVzaCIsImlwYWRkciI6IjIwMy4xODkuMTgxLjEzNSIsIm5hbWUiOiJTaGV0ZSwgQWtoaWxlc2giLCJub25jZSI6ImY3ZTYxZThlLTY5NTYtNGUxZi04OGJiLTJhNzJkMmY4NzRkYSIsIm9pZCI6IjViZTlhMDMzLTZlNzQtNDEyMC04NDM5LTE1MzFiYzhhMDk1OSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0xNTMxMDgyMzU1LTczNDY0OTYyMS0zNzgyNTc0ODk4LTM0NDU5MDUiLCJwdWlkIjoiMTAwMzIwMDAzODRCQjQwQyIsInN1YiI6ImpYYVFaRUo4dWNrSjRnZ3ZNSnJtUGR4X015RFpHR0xYeGo1NmN0VFY5blEiLCJ0aWQiOiI3NmEyYWU1YS05ZjAwLTRmNmItOTVlZC01ZDMzZDc3YzRkNjEiLCJ1bmlxdWVfbmFtZSI6ImFraGlsZXNoLnNoZXRlQGNhcGdlbWluaS5jb20iLCJ1cG4iOiJha2hpbGVzaC5zaGV0ZUBjYXBnZW1pbmkuY29tIiwidXRpIjoic1VhYnpWMGhqMEN0aGFkMHlFTlNBQSIsInZlciI6IjEuMCJ9.gg_EGqhkk4HzXUrofuu7vbevPwLaS0P7Ve9qEGJXDeXrssRVmcP6DQBKgVoQ-gYTCN_13_aSjGblEQLioF3i4y1MV2NLQycutFTZ-qWz8eSmFDVVQGOlCAFlV8F0pezqiNKk7Hnaqo2xaPJ0ZhaCx01ch6yrlfltMGBX5ZFgK9J0WF3WR8ioHjFl2DffJsUt_ZaRO20BGBnYGeqrUM_doLdfzYlI2iYZQAiwrEWq3bVJQ5axR-c5ul3lB2KO-OpvzmGAMHfhARJyasXJ6iodAvczNnoeHL9acHW0sImYfxWKyFa1nqWI90jaJlnMI2VLi9bwR-GMPnlLVNb6g-WhzQ');

      var data=   {
                     "searchSpan": {
                        "from": {"dateTime":"2016-08-01T00:00:00.000Z"},
                        "to": {"dateTime":"2019-08-31T00:00:00.000Z"}
                     },
                     "top" : {
                        "sort" : [{
                           "input" : {
                                 "builtInProperty" : "$ts"
                           },
                           "order" : "Asc"
                        }],
                        "count" : 10
                     }
                  }
      
      return this.http.post('https://57dc1c37-301f-4c52-9d8e-ab6adf1c8122.env.timeseries.azure.com/events?api-version=2016-12-12',data,{ headers: headers})
         .subscribe(
            res =>{
               console.log(res['events']);
               var response = res['events'];
               console.log(response[0].$ts);
               for(var i=0; i< response.length; i++){
                  var temp = [];
                  var datePipe = new DatePipe("en-US");
                  var value = datePipe.transform(response[i].$ts, 'dd/MM/yyyy h:mm:ss');
                  temp.push(value);
                  temp.push(parseInt(response[i].values[3]));
                  this.grpahData.push(temp);
               }
            },
            err => {
               console.log("innn")
               console.log(err);
            }
         )
   }

   title = 'Time series of  Speed';
   type = 'LineChart';
   
   
   columnNames = ["Timestamp", "Speed"];
   options = {   
      hAxis: {
         title: 'Timestamp'
      },
      vAxis:{
         title: 'Speed'
      },
      pointSize:5
   };
   width = 1100;
   height = 400;

}
