import { Component, OnInit } from '@angular/core';
import { ArchiveDecisionService } from '../../services/archive-decision.service';
import { ArchiveDecision } from './archive-decision.model';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Import IonicModule pour mobile

@Component({
  selector: 'app-archive-decision',
  templateUrl: './archive-decision.component.html',
  styleUrls: ['./archive-decision.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule // Ajoute IonicModule pour utiliser les composants Ionic dans le template
  ]
})
export class ArchiveDecisionComponent implements OnInit {
  archives: ArchiveDecision[] = [];
  sousMenu: string = 'liste';

  constructor(private archiveService: ArchiveDecisionService) {}

  ngOnInit(): void {
    this.loadArchives();
  }

  /**
   * Charge toutes les décisions archivées
   */
  loadArchives(): void {
    this.archiveService.getAll().subscribe({
      next: (data) => {
        this.archives = data;
        // Pour mobile, tu peux notifier l'utilisateur ici si besoin
      },
      error: (error) => {
        // Pour mobile, tu peux afficher un toast ou une alerte
        console.error('Erreur lors du chargement des archives:', error);
      }
    });
  }

  /**
   * Définit le sous-menu actif
   */
  setSousMenu(nom: string): void {
    this.sousMenu = nom;
  }
}
