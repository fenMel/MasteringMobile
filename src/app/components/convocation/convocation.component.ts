import { Component } from '@angular/core';
import { ConvocationService } from 'src/app/services/convocation.service';
import {
  IonHeader,
  IonLabel,
  IonInput,
  IonItem,
  IonContent,
  IonToolbar,
  IonTitle,
  IonList, IonDatetime, IonButton
} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-convocation-component',
  templateUrl: './convocation.component.html',
  styleUrls: ['./convocation.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonDatetime,
    IonButton
  ]
})
export class ConvocationComponent {
  convocation = {
    email: '',
    title: '',
    date: '',
    heure: '',
    lieu: ''
  };

  constructor(
    private convocationService: ConvocationService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  async envoyerConvocation() {
    const loading = await this.loadingCtrl.create({
      message: 'Envoi en cours...',
      spinner: 'crescent',
    });
    await loading.present();

    const formattedDateTime = this.formatDateFr(this.convocation.date, this.convocation.heure);
    const dto = {
      email: this.convocation.email,
      title: this.convocation.title,
      lieu: this.convocation.lieu,
      date: formattedDateTime
    };

    this.convocationService.envoyerConvocation(dto).subscribe({
      next: async () => {
        console.log('Convocation envoyée avec succès', dto);
        await loading.dismiss();
        this.resetForm();
        this.showAlert('Succès', '✅ Convocation envoyée avec succès !');
      },
      error: async () => {
        await loading.dismiss();
        this.showAlert('Erreur', '❌ Erreur lors de l’envoi de la convocation.');
      }
    });
  }

  formatDateFr(date: string, time: string): string {
    const [yyyy, mm, dd] = date.split('-');
    return `${dd}/${mm}/${yyyy} ${time}`;
  }

  resetForm() {
    this.convocation = {
      email: '',
      title: '',
      date: '',
      heure: '',
      lieu: ''
    };
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
