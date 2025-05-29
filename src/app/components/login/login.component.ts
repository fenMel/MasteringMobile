import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonItem, IonLabel, IonInput, IonButton, IonText, IonSpinner, AlertController, ToastController } from '@ionic/angular/standalone';
import {AuthService, LoginRequest} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonSpinner
  ]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async onLogin() {
    if (!this.email || !this.password) {
      await this.showAlert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    this.isLoading = true;

    const credentials: LoginRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: async (response) => {
        this.isLoading = false;
        if (response.token) {
          await this.showToast('Connexion réussie!', 'success');
          await this.router.navigate(['/dashboard']);
        } else {
          await this.showAlert('Erreur', response.message || 'Erreur de connexion');
        }
      },
      error: async (error) => {
        this.isLoading = false;
        await this.showAlert('Erreur de connexion', error);
      }
    });
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']

    });
    await alert.present();
  }

  private async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}
