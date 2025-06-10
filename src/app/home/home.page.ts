import { Component } from '@angular/core';
<<<<<<< HEAD
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { EvaluationComponent } from '../evaluation/evaluation.component'; // <-- Ajoute cette ligne
=======
>>>>>>> feature/ajout_composant_de_navigation

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
<<<<<<< HEAD
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
=======
  standalone: false,
})
export class HomePage {

  constructor() {}

>>>>>>> feature/ajout_composant_de_navigation
}
