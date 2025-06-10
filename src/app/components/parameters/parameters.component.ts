import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {
  IonApp, IonAvatar, IonBadge, IonButton,
  IonButtons, IonChip,
  IonContent, IonFab, IonFabButton,
  IonHeader, IonIcon, IonItem, IonLabel, IonList,
  IonMenu,
  IonMenuButton, IonSearchbar, IonSelect, IonSelectOption,
  IonTitle, IonToggle,
  IonToolbar
} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
  standalone:true,
  imports: [IonApp, IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton,
    IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonIcon, IonButton,
    IonSearchbar, FormsModule, IonBadge, IonFab, IonFabButton, IonAvatar,
    IonChip, IonSelect, IonSelectOption, IonToggle, IonList, IonChip
  ]
})
export class ParametersComponent  implements OnInit {

  currentUser: any;
  settings = {
    notifications: true,
    language: 'fr',
    darkMode: false,
    biometric: false,
    autoLogout: '30'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuController: MenuController
  ) {
  }

  ngOnInit() {
    // Get user from query params or localStorage
    this.route.queryParams.subscribe(params => {
      if (params['userId']) {
        this.currentUser = {
          id: params['userId'],
          name: 'Admin User',
          role: params['userRole'] || 'Coordinateur'
        };
      }
    });

    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      this.settings = {...this.settings, ...JSON.parse(savedSettings)};
    }
  }

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

  toggleDarkMode() {
    document.body.classList.toggle('dark', this.settings.darkMode);
  }

  changePassword() {
    console.log('Change password clicked');
    // Navigate to change password page or show modal
  }

  editProfile() {
    console.log('Edit profile clicked');
    // Navigate to profile editing page
  }

  saveSettings() {
    localStorage.setItem('userSettings', JSON.stringify(this.settings));

    // Show toast or alert
    console.log('Settings saved!');
  }
}


