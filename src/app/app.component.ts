import { Component } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Renderer } from '@angular/core';
import { AppService } from './app.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit{


  constructor(private renderer: Renderer){}

  ngOnInit(){
    
  }


}
