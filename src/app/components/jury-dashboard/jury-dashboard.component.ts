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
import { EvaluationStateService } from 'src/app/services/evaluation-state.service';

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
  constructor(private evaluationState: EvaluationStateService) {}

  logout() {
        this.evaluationState.resetEvaluations = true;

    localStorage.clear();
      sessionStorage.clear();

    window.location.href = '/login';
  }
}
