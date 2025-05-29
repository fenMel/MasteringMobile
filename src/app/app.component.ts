import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
  standalone: true,
  imports: [IonApp, IonRouterOutlet]
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.loadUserFromToken(); // <-- très important
  }
}
