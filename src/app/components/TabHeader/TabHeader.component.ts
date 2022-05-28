import { Component, Input, NgModule, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-TabHeader',
  templateUrl: './TabHeader.component.html',
  styleUrls: ['./TabHeader.component.css']
})
export class TabHeaderComponent implements OnInit {

  @Input() name: string;
  @Input() icon: string;
  
  constructor() { }

  ngOnInit() {
  }


}
