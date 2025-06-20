import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButtons, IonButton, IonIcon, IonMenuButton, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
      CommonModule,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardSubtitle,
      IonCardContent,
      IonButtons,
      IonButton,
      IonIcon,
      IonMenuButton
  ]
})
export class DashboardComponent implements OnInit {
  currentUser: any = null;


  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({ logOutOutline });
  }


    ngOnInit() {
      this.currentUser = this.authService.getCurrentUser();
      console.log('Current User Info:', this.currentUser);
    }


  async logout() {
    const alert = await this.alertController.create({
      header: 'Déconnexion',
      message: 'Êtes-vous sûr de vouloir vous déconnecter?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Déconnexion',
          handler: () => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('currentUser');
            this.authService.logout();
            this.currentUser = null;
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }
}
