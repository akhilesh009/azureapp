import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
   private json_data = [{"machine_id":1,"machine_name":"Compressor","company_id":1,"loc_id":1,"site_id":1}];   
   constructor(private router:Router) {
      
   }
 
   ngOnInit() {
    this.getBreadCrumb();
   }
 

   title = '';
   type = 'PieChart';
   data = [
      ['Cost', 45.0],
      ['Efficiency', 26.8],
      ['Discharge', 12.8],
      ['Installation', 15.4]
   ];
   columnNames = ['Browser', 'Percentage'];
   options = {    
      is3D:true
   };
   width = 340;
   height = 250;

   title1 = 'Fruits distribution';
   type1 = 'ComboChart';
   data1 = [
      ["Apples", 3, 2, 2.5],
      ["Oranges",2, 3, 2.5],
      ["Pears", 1, 5, 3],
      ["Bananas", 3, 9, 6],
      ["Plums", 4, 2, 3]
   ];
   columnNames1 = ['Fruits', 'Jane','Jone','Average'];
   options1 = {   
      hAxis: {
         title: 'Person'
      },
      vAxis:{
         title: 'Fruits'
      },
      seriesType: 'bars',
      series: {2: {type: 'line'}}
   };
   width1 = 650;
   height1 = 320;

//Availability
   title2 = 'Availability';
   type2 = 'PieChart';
   data2 = [
      ['Discharge Pressure', 99.0],
      ['Maximum Flow Rate', 1.0],

   ];
   columnNames2 = ['Browser', 'Percentage'];
   options2 = {    
      pieHole:0.4
   };
   width2 = 500;
   height2 = 320;
   

//quality
   title3 = 'Quality';
   type3 = 'PieChart';
   data3 = [
      ['Discharge Pressure', 99.0],
      ['Maximum Flow Rate', 1.0],

   ];
   columnNames3 = ['Browser', 'Percentage'];
   options3 = {    
      pieHole:0.4
   };
   width3 = 500;
   height3 = 320;


  

  getBreadCrumb() {
      // this.httpClient.get("http://localhost:3000/getdata").subscribe((res) =>{
      //    console.log(res);
      // });

      console.log(this.json_data);
  }


  

}
