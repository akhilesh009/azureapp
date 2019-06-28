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

  token:string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiIxMjBkNjg4ZC0xNTE4LTRjZjctYmQzOC0xODJmMTU4ODUwYjYiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83NmEyYWU1YS05ZjAwLTRmNmItOTVlZC01ZDMzZDc3YzRkNjEvIiwiaWF0IjoxNTYxNzAwMzIyLCJuYmYiOjE1NjE3MDAzMjIsImV4cCI6MTU2MTcwNDIyMiwiYWlvIjoiQVNRQTIvOExBQUFBY09GdzVLQTU2dGRCaVM4ajVDWmh6ZE1Db05aZmg4ZmY5WVQ0ck9iREdYTT0iLCJhbXIiOlsid2lhIl0sImZhbWlseV9uYW1lIjoiU2hldGUiLCJnaXZlbl9uYW1lIjoiQWtoaWxlc2giLCJpbl9jb3JwIjoidHJ1ZSIsImlwYWRkciI6IjIwMy4xODkuMTgxLjEzNSIsIm5hbWUiOiJTaGV0ZSwgQWtoaWxlc2giLCJub25jZSI6ImZjM2M0NmM0LTExMTYtNGZmMC1iNmJhLWUyZmU2ZTliZWExZiIsIm9pZCI6IjViZTlhMDMzLTZlNzQtNDEyMC04NDM5LTE1MzFiYzhhMDk1OSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0xNTMxMDgyMzU1LTczNDY0OTYyMS0zNzgyNTc0ODk4LTM0NDU5MDUiLCJwdWlkIjoiMTAwMzIwMDAzODRCQjQwQyIsInN1YiI6ImpYYVFaRUo4dWNrSjRnZ3ZNSnJtUGR4X015RFpHR0xYeGo1NmN0VFY5blEiLCJ0aWQiOiI3NmEyYWU1YS05ZjAwLTRmNmItOTVlZC01ZDMzZDc3YzRkNjEiLCJ1bmlxdWVfbmFtZSI6ImFraGlsZXNoLnNoZXRlQGNhcGdlbWluaS5jb20iLCJ1cG4iOiJha2hpbGVzaC5zaGV0ZUBjYXBnZW1pbmkuY29tIiwidXRpIjoiQUFOd3Q5TThra21UaDhtWEI1bGtBQSIsInZlciI6IjEuMCJ9.bwjUKfSr0ZywkPwTOIx2NdCpyGLe1Q7aQGWyqsLYdsrsqVsWoGpuiaRo6bRzv8VzX9hKRYoHyDfUsLVw6TKzjCSdEcNWyyTBMS9VPHtfDxFBO9DQAcEUcqThqkDm7WAEr8VWBz4CDuwvHpMwvFA4lHtMtMFcjvh0l9g8_8BZTw9ADlcp1EMWJgCuagsnWmkHeraACEFfp7_FrIg4bMwl8RqBJpR74MNMaMkNIiwZKGVRDanRMz_blr155djQSstw82Xgx5MHTBeDw4fEKq7VXRnWjcZXDpX_zzL6UPpEshw1Czmb6uxazb9ShG2Kp9cm2nUb_He99ncHQB_BVN7F6w';

  getTimeseries(fromDt:Date,toDt:Date) { //

   let promise = new Promise((resolve, reject) => {
         let headers = new HttpHeaders(); 
         headers = headers.set('Content-Type', 'application/json; charset=utf-8');
         headers = headers.set('Authorization','Bearer '+this.token);

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
                  this.graphData = [];
                  var response = res['events'];
                  for(var i=0; i< response.length; i++){
                     var temp = [];
                     var datePipe = new DatePipe("en-US");
                     var value = datePipe.transform(response[i].$ts, 'dd-MMM-yy h:mm:ss');
                     temp.push(value);
                     temp.push(parseInt(response[i].values[3]));
                     this.graphData.push(temp);
                  }
                  resolve();
               },
               err => {
                  
                  console.log(err);
                  reject();
               }
            )
      });
      return promise;
  }
}
