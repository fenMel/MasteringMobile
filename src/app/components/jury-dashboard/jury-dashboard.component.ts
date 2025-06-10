import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-jury-dashboard',
  templateUrl: './jury-dashboard.component.html',
  styleUrls: ['./jury-dashboard.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]

})

export class JuryDashboardComponent {
  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
