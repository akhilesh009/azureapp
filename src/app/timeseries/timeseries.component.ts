import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeseries',
  templateUrl: './timeseries.component.html',
  styleUrls: ['./timeseries.component.css']
})
export class TimeseriesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

     title = 'Average Temperatures of Cities';
   type = 'LineChart';
   data = [
      ["Jan",  7.0],
      ["Feb",  6.9],
      ["Mar",  9.5],
      ["Apr",  14.5],
      ["May",  18.2],
      ["Jun",  21.5],
      ["Jul",  25.2],
      ["Aug",  26.5],
      ["Sep",  23.3],
      ["Oct",  18.3],
      ["Nov",  13.9],
      ["Dec",  9.6]
   ];
   columnNames = ["Month", "Humidity"];
   options = {   
      hAxis: {
         title: 'Month'
      },
      vAxis:{
         title: 'Temperature'
      },
      pointSize:5
   };
   width = 550;
   height = 400;

}
