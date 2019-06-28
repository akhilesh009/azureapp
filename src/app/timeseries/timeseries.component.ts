import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { GetTimeseriesDataService } from '../timeseries/get-timeseries-data.service';
import { MatSnackBar } from "@angular/material";




import {Observable} from 'rxjs';


@Component({
  selector: 'app-timeseries',
  templateUrl: './timeseries.component.html',
  styleUrls: ['./timeseries.component.css']
})
export class TimeseriesComponent implements OnInit {

   datatimes = ['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00',
   '13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'];

   fromDt:Date;
   toDt:Date;
   type:string;
   title:string;
   data:any;
   showGrpah:boolean = false;
   showSpinner:boolean = false;   

   constructor(private http:HttpClient , private timeseriesService: GetTimeseriesDataService, public snackBar: MatSnackBar) { 
      this.type = 'LineChart';
      this.title = 'Time series of  Speed';
      this.data = [];
   }

   

   ngOnInit() 
   {
   }

   getgraph(fromdate, fromtime, todate, totime){
      if(fromdate ==='' || todate === ''){
         this.snackBar.open("Please select From and To dates.", "", {
            duration: 3000,
         });
         return false;
      }
      else{
         this.showGrpah = false;
         this.fromDt = new Date(fromdate+' '+fromtime);
         this.toDt   = new Date(todate+' '+totime);
         this.showSpinner = true;
         this.timeseriesService.getTimeseries(this.fromDt,this.toDt).then(
            res => { // Success
               this.showSpinner = true;
               if(this.timeseriesService.graphData.length == 0){
                  this.showSpinner = false;
                  this.snackBar.open("No data found for selected dates.", "", {
                     duration: 3000,
                  });   
               }else{
                  this.data = this.timeseriesService.graphData;
                  this.showGrpah = true;
                  this.showSpinner = false;
               }
               
            },
            err =>{ //error
               this.showGrpah = false;
               this.showSpinner = false;
               this.snackBar.open("Server is down . Please try after sometime.", "", {
                  duration: 3000,
               });
            }
          );   
      }
    
      
   }   
   
   
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
