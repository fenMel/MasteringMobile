import { Component, ViewChild } from '@angular/core';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonIcon,
  IonLabel,
  IonApp,
  IonBadge,
  IonButton,
  IonList,
  IonAvatar,
  IonSplitPane
} from '@ionic/angular/standalone';
import { EvaluationComponent } from '../evaluation/evaluation.component';

@Component({
  selector: 'app-jury-dashboard',
  templateUrl: './jury-dashboard.component.html',
  styleUrls: ['./jury-dashboard.component.scss'],
  standalone: true,
  imports: [
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonItem,
    IonIcon,
    IonLabel,
    IonApp,
    IonBadge,
    IonButton,
    IonList,
    IonAvatar,
    IonSplitPane,
    EvaluationComponent
  ]
})
export class JuryDashboardComponent {
  juryName = 'Nom Jury'; // À remplacer par la vraie donnée si besoin

  @ViewChild(IonMenu) menu!: IonMenu;

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
