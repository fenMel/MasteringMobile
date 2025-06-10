import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
  imports: [
    IonicModule,
    

  ],
  standalone: true
})
export class UnauthorizedComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  goHome() {
    window.location.href = '/login';
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
