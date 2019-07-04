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

  token:string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiIxMjBkNjg4ZC0xNTE4LTRjZjctYmQzOC0xODJmMTU4ODUwYjYiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83NmEyYWU1YS05ZjAwLTRmNmItOTVlZC01ZDMzZDc3YzRkNjEvIiwiaWF0IjoxNTYyMTQ3NjIyLCJuYmYiOjE1NjIxNDc2MjIsImV4cCI6MTU2MjE1MTUyMiwiYWlvIjoiNDJaZ1lIQXhDbCtjRVNNWnVYOU8rTU0xeng3c25WY2JvdVF5aHl0bVdYSjJiZmh1aFI4QSIsImFtciI6WyJ3aWEiXSwiZmFtaWx5X25hbWUiOiJTaGV0ZSIsImdpdmVuX25hbWUiOiJBa2hpbGVzaCIsImluX2NvcnAiOiJ0cnVlIiwiaXBhZGRyIjoiMjAzLjE4OS4xODEuMTM1IiwibmFtZSI6IlNoZXRlLCBBa2hpbGVzaCIsIm5vbmNlIjoiM2QxYzJlNGMtNDlkNC00YzQ3LTg1ODgtMTRkOGRkNmI0MGM4Iiwib2lkIjoiNWJlOWEwMzMtNmU3NC00MTIwLTg0MzktMTUzMWJjOGEwOTU5Iiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTE1MzEwODIzNTUtNzM0NjQ5NjIxLTM3ODI1NzQ4OTgtMzQ0NTkwNSIsInB1aWQiOiIxMDAzMjAwMDM4NEJCNDBDIiwic3ViIjoialhhUVpFSjh1Y2tKNGdndk1Kcm1QZHhfTXlEWkdHTFh4ajU2Y3RUVjluUSIsInRpZCI6Ijc2YTJhZTVhLTlmMDAtNGY2Yi05NWVkLTVkMzNkNzdjNGQ2MSIsInVuaXF1ZV9uYW1lIjoiYWtoaWxlc2guc2hldGVAY2FwZ2VtaW5pLmNvbSIsInVwbiI6ImFraGlsZXNoLnNoZXRlQGNhcGdlbWluaS5jb20iLCJ1dGkiOiJBYXBGVUh2SHNVdVNXMWlBOGRnWEFBIiwidmVyIjoiMS4wIn0.KW7fEjEXvhe0A2rbgfUR7Q9hG1PnxZ3uorsiMYLCgJcIKy26ZgdftkH2tK91VrjDXwJADRLkEkigDWyE0whETvy598nuBOhLsEVJnOEFSw62ME-yNrtrMwRvmJ-0NwY_cIwPCP8cxMLDn9Z3polYkO_GP0bdimMsce6r-bRhpU0CIvE7loWvSm5CPSuaLaPLgCtPRfj6yKbPPF33ibmks1v4SmTFM1X8BK0e3j3koJFXUIMUzG7m5aD53yqp8DfYeQRSVThdj25le8q_VRO1ug0RYtJ7yGHIokT_m26d_gZHrTi0UmK3WRvPJfqkOGf0g0Ym8_Qw3WcDQiCmHvp3vw';

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
                  
                  //console.log(err.status);
                  reject(err.status);
               }
            )
      });
      return promise;
  }
}
