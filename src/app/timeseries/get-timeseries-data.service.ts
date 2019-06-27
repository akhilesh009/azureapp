import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {Observable} from 'rxjs';
import { Http, Response } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class GetTimeseriesDataService {

  constructor(private http:HttpClient) { }

  graphData = [];

  getTimeseries(fromDt:Date,toDt:Date) { //

   let promise = new Promise((resolve, reject) => {
         let headers = new HttpHeaders(); 
         headers = headers.set('Content-Type', 'application/json; charset=utf-8');
         headers = headers.set('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiIxMjBkNjg4ZC0xNTE4LTRjZjctYmQzOC0xODJmMTU4ODUwYjYiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83NmEyYWU1YS05ZjAwLTRmNmItOTVlZC01ZDMzZDc3YzRkNjEvIiwiaWF0IjoxNTYxNjEyNTYzLCJuYmYiOjE1NjE2MTI1NjMsImV4cCI6MTU2MTYxNjQ2MywiYWlvIjoiQVNRQTIvOExBQUFBd1ZCdjB6VXI0azhKQ0Q3bWxNSHpEYzlNdDVwejBaaUwzZVZaWGtsYnFCMD0iLCJhbXIiOlsid2lhIl0sImNfaGFzaCI6ImJRM2pTMWFFV3ZTa1pMUzl3TXhqTnciLCJmYW1pbHlfbmFtZSI6IlNoZXRlIiwiZ2l2ZW5fbmFtZSI6IkFraGlsZXNoIiwiaW5fY29ycCI6InRydWUiLCJpcGFkZHIiOiIyMDMuMTkxLjM0LjE4MSIsIm5hbWUiOiJTaGV0ZSwgQWtoaWxlc2giLCJub25jZSI6IjUxM2U4Yzg4LWVhZWEtNGU2NC04NWM0LTdlN2VjMTM1ZjI2NSIsIm9pZCI6IjViZTlhMDMzLTZlNzQtNDEyMC04NDM5LTE1MzFiYzhhMDk1OSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0xNTMxMDgyMzU1LTczNDY0OTYyMS0zNzgyNTc0ODk4LTM0NDU5MDUiLCJwdWlkIjoiMTAwMzIwMDAzODRCQjQwQyIsInN1YiI6ImpYYVFaRUo4dWNrSjRnZ3ZNSnJtUGR4X015RFpHR0xYeGo1NmN0VFY5blEiLCJ0aWQiOiI3NmEyYWU1YS05ZjAwLTRmNmItOTVlZC01ZDMzZDc3YzRkNjEiLCJ1bmlxdWVfbmFtZSI6ImFraGlsZXNoLnNoZXRlQGNhcGdlbWluaS5jb20iLCJ1cG4iOiJha2hpbGVzaC5zaGV0ZUBjYXBnZW1pbmkuY29tIiwidXRpIjoieUlQc0J4NG9EMDY4SlVUa2Q0OHVBQSIsInZlciI6IjEuMCJ9.RmcY23Ny7-uG4H8vV6FURM21TYqnGRn4q-PF023812tuIriy7aHzCZqCOTnC-cr-TVvP55_PI8yKNrhOG-lf2kJEzulaqi7s2gqcjqIUbix4o6cVbVyLQGq0HiT4Q44d0VzJIaglVHUSDfiyWZHT5ozsMvReLY71ZiZtUyEvVfRZxguzigDEd_1ZJLqzlWPlovW3qa2xrAN5OY4lRftJ16TquGIba-ZsyXhD-H9f6XcjOdXYCVem4jvFU1h9nNdOYZqIvq2ao9ma0mpv1wd57IRp826Z0_Q9qJHY0lfluO7Ozd5d0Gdjnymb6ks1sMBlaxbBXqMei1PqsBKix4FXMA');

         var data=   {
                        "searchSpan": {
                           "from": {"dateTime": fromDt},
                           "to": {"dateTime": toDt}
                        },
                        "top" : {
                           "sort" : [{
                              "input" : {
                                    "builtInProperty" : "$ts"
                              },
                              "order" : "Asc" //Asc
                           }],
                           "count" : 10
                        }
                     }
         
         return this.http.post('https://57dc1c37-301f-4c52-9d8e-ab6adf1c8122.env.timeseries.azure.com/events?api-version=2016-12-12',data,{ headers: headers})
         .toPromise()
         .then(
               res =>{
                  var response = res['events'];
                  for(var i=0; i< response.length; i++){
                     var temp = [];
                     var datePipe = new DatePipe("en-US");
                     var value = datePipe.transform(response[i].$ts, 'dd-MMM-yy h:mm:ss');
                     temp.push(value);
                     temp.push(parseInt(response[i].values[3]));
                     this.graphData.push(temp);
                     resolve();
                  }
               },
               err => {
                  console.log("innn")
                  console.log(err);
                  reject();
               }
            )
      });
      return promise;
  }
}
