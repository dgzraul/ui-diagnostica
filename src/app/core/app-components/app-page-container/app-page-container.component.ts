import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-container',
  templateUrl: './app-page-container.component.html',
  styleUrls: ['./app-page-container.component.css']
})
export class AppPageContainerComponent implements OnInit {
  @Input('title') title: String | undefined; 
  
  constructor() { }

  ngOnInit(): void {
  }

}
