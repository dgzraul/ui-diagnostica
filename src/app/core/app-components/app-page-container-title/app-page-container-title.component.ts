import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-container-title',
  templateUrl: './app-page-container-title.component.html',
  styleUrls: ['./app-page-container-title.component.css']
})
export class AppPageContainerTitleComponent implements OnInit {
  @Input('label-section') label: String | undefined; 
  
  constructor() { }

  ngOnInit(): void {
  }

}
