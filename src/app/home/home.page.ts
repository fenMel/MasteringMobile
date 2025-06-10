import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { EvaluationComponent } from '../components/evaluation/evaluation.component'; // <-- Ajoute cette ligne

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    EvaluationComponent // <-- Ajoute ce composant ici
  ],
})
export class HomePage {
  constructor() {}
}
