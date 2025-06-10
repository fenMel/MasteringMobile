import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  IonApp,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonBadge,
  IonChip,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle
} from '@ionic/angular/standalone';
import {
  person, folder, calendar, notifications, settings, logOut,
  documentText, time, checkmarkCircle, briefcase, business,
  chevronForward, arrowForward, home, add, search, personCircle
} from 'ionicons/icons';
import {addIcons} from "ionicons";

@Component({
  selector: 'app-candidat-dashboard',
  templateUrl: './candidat-dashboard.component.html',
  styleUrls: ['./candidat-dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DatePipe,
    IonApp,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonBadge,
    IonChip,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle
  ]
})
export class CandidatDashboardComponent implements OnInit {
  studentName = 'John Doe'; // This would come from your auth service
  stats = {
    applications: 12,
    pending: 5,
    accepted: 3,
    interviews: 2
  };

  quickActions = [
    {
      icon: 'document-text',
      title: 'Nouvelle candidature',
      subtitle: 'Postuler à un emploi',
      color: 'primary',
      route: '/dashboard/candidat/nouvelle-candidature'
    },
    {
      icon: 'folder',
      title: 'Mes candidatures',
      subtitle: 'Voir toutes mes candidatures',
      color: 'success',
      route: '/dashboard/candidat/mes-candidatures'
    },
    {
      icon: 'person',
      title: 'Mon profil',
      subtitle: 'Modifier mes informations',
      color: 'tertiary',
      route: '/dashboard/candidat/profil'
    },
    {
      icon: 'calendar',
      title: 'Entretiens',
      subtitle: 'Mes rendez-vous',
      color: 'warning',
      route: '/dashboard/candidat/entretiens'
    }
  ];

  recentApplications = [
    {
      company: 'Tech Solutions',
      position: 'Développeur Frontend',
      status: 'pending',
      date: '2024-01-15',
      logo: 'business'
    },
    {
      company: 'Digital Agency',
      position: 'Designer UX/UI',
      status: 'accepted',
      date: '2024-01-12',
      logo: 'business'
    },
    {
      company: 'StartUp Inc',
      position: 'Stage Marketing',
      status: 'interview',
      date: '2024-01-10',
      logo: 'business'
    }
  ];

  constructor(private router: Router) {
    // Register all icons
    addIcons({
      person, folder, calendar, notifications, settings, logOut,
      documentText, time, checkmarkCircle, briefcase, business,
      chevronForward, arrowForward, home, add, search, personCircle
    });
  }

  ngOnInit() {
    // Load user data and stats
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending': return 'warning';
      case 'accepted': return 'success';
      case 'rejected': return 'danger';
      case 'interview': return 'primary';
      default: return 'medium';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'pending': return 'En attente';
      case 'accepted': return 'Acceptée';
      case 'rejected': return 'Refusée';
      case 'interview': return 'Entretien';
      default: return 'Inconnu';
    }
  }
}
