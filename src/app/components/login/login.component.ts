import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonItem, IonLabel, IonInput, IonButton, IonText, IonSpinner, AlertController, ToastController } from '@ionic/angular/standalone';
import { AuthService } from "../../services/auth.service";

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
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  role: string | null = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

    ngOnInit() {

   }

  async onLogin() {

    if (!this.email || !this.password) {
      await this.showAlert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    this.isLoading = true;

    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: async (response) => {
        this.isLoading = false;
        const token = (response as any).body?.token;
        if (token) {
          this.authService.saveTokenInSessionStorage(response); // ou adapte selon ta logique
          this.authService.loadUserFromToken();
          this.role = this.authService.getUserRole();
          console.log(this.role);
          await this.showToast('Connexion réussie!', 'success');
          await this.router.navigate(['/welcome']);

        } else {
          const message = (response as any).body?.message || 'Erreur de connexion';
          await this.showAlert('Erreur', message);
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
