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
      headers = headers.set('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiIxMjBkNjg4ZC0xNTE4LTRjZjctYmQzOC0xODJmMTU4ODUwYjYiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83NmEyYWU1YS05ZjAwLTRmNmItOTVlZC01ZDMzZDc3YzRkNjEvIiwiaWF0IjoxNTYxNTI5Mzk1LCJuYmYiOjE1NjE1MjkzOTUsImV4cCI6MTU2MTUzMzI5NSwiYWlvIjoiNDJaZ1lIaHcwblBmMFJpL3c4bGNLNnhxRGthcVdhaGRUS3FaT2tmNU9mTU9HVU9qZDFjQiIsImFtciI6WyJ3aWEiXSwiZmFtaWx5X25hbWUiOiJTaGV0ZSIsImdpdmVuX25hbWUiOiJBa2hpbGVzaCIsImluX2NvcnAiOiJ0cnVlIiwiaXBhZGRyIjoiMjAzLjE5MS4zNC4xODEiLCJuYW1lIjoiU2hldGUsIEFraGlsZXNoIiwibm9uY2UiOiI5MDE1MzVlOS04MmFlLTQ5MmMtOTE3Yi1iNGQ2ZGJlN2U3NjkiLCJvaWQiOiI1YmU5YTAzMy02ZTc0LTQxMjAtODQzOS0xNTMxYmM4YTA5NTkiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMTUzMTA4MjM1NS03MzQ2NDk2MjEtMzc4MjU3NDg5OC0zNDQ1OTA1IiwicHVpZCI6IjEwMDMyMDAwMzg0QkI0MEMiLCJzdWIiOiJqWGFRWkVKOHVja0o0Z2d2TUpybVBkeF9NeURaR0dMWHhqNTZjdFRWOW5RIiwidGlkIjoiNzZhMmFlNWEtOWYwMC00ZjZiLTk1ZWQtNWQzM2Q3N2M0ZDYxIiwidW5pcXVlX25hbWUiOiJha2hpbGVzaC5zaGV0ZUBjYXBnZW1pbmkuY29tIiwidXBuIjoiYWtoaWxlc2guc2hldGVAY2FwZ2VtaW5pLmNvbSIsInV0aSI6IjBjeW1IOEd6a1VHclJ5bk1CSWNGQUEiLCJ2ZXIiOiIxLjAifQ.L36GiLYypSk_6Vh39dn9bX99FYmYVTKtgoNJ-xhG6YVhoH7B1TlLBl0iLZWrFOnHM1AS_wQ298PoM3siJVnuJRYL5z023Tb9-PCvc54BXuaJsBPCe3bpqIEHZellavGyHqguVU5KFXabDkEwVCBbzUgw7VaVJN8L3zYdRaPG-TTKg_U8n4QAT-k1o7VWJ2XML2jCErQIFP_Am1dS6lak_rtjDVYXJpFHDtzKe6L2Kw6sw2QxBZlA_9Po77WIttKDixrGdoZ0YRizYpMQrwoAhocQuAikOZe1pM9UR-ZD5z8rE3IWK5Wr-QBCJvbtxzfegq4hHCfsuQtHpr31a-Rp4g');

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
