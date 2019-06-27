import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { GetTimeseriesDataService } from '../timeseries/get-timeseries-data.service';




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
   constructor(private http:HttpClient , private timeseriesService: GetTimeseriesDataService) { 
      this.type = 'LineChart';
      this.title = 'Time series of  Speed';
      this.data = [];
   }

   

   ngOnInit() 
   {
   }

   getgraph(fromdate, fromtime, todate, totime){
      
      this.fromDt = new Date(fromdate+' '+fromtime);
      this.toDt   = new Date(todate+' '+totime);
      this.timeseriesService.getTimeseries(this.fromDt,this.toDt).then(
         res => { // Success
            this.data = this.timeseriesService.graphData;
         }
       );     
      
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
