import { Component, OnInit } from '@angular/core';
import {
  IonApp, IonBadge, IonButton, IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu, IonMenuButton, IonSelect, IonSelectOption,
  IonTitle, IonToggle, IonToolbar
} from "@ionic/angular/standalone";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    IonApp,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonBadge,
    IonToggle,
    IonSelect,
    IonSelectOption
  ],
  standalone: true
})
export class ProfileComponent  implements OnInit {
  currentUser: any;


  constructor( private route: ActivatedRoute,
               private router: Router,
               private menuController: MenuController) { }

  ngOnInit() {}


  async navigateTo(route: string) {
    await this.menuController.close();
    await this.router.navigate([route], {
      queryParams: {
        userId: this.currentUser?.id || 1,
        userRole: this.currentUser?.role || 'coordinator'
      }
    });
  }

  async logout() {
    await this.menuController.close();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userSettings');
    await this.router.navigate(['/login']);
  }
}
