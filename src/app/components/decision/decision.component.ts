import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DecisionService } from '../../services/decision.service';
import { Decision } from '../decision/decision.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-decision',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.scss']
})
export class DecisionComponent implements OnInit {
  decisions: Decision[] = [];
  filtres = {
    statut: 'Tous les statuts',
    recherche: ''
  };
  optionsStatut = ['Tous les statuts', 'ADMIS', 'NON_ADMIS', 'RATTRAPAGE'];
  pageActuelle = 1;
  decisionsParPage = 5;
  totalDecisions = 0;

  constructor(private decisionService: DecisionService, private router: Router) {}

  ngOnInit(): void {
    this.chargerDecisions();
  }

  chargerDecisions(): void {
    this.decisionService.getAllDecisions().subscribe({
      next: (data) => {
        this.decisions = data;
        this.totalDecisions = data.length;
      },
      error: () => {
        // Gère l'erreur (snackbar, etc.)
      }
    });
  }

  appliquerFiltres(): void {
    this.pageActuelle = 1;
  }

  get decisionsAffichees(): Decision[] {
    let filtered = [...this.decisions];

    // Filtre statut
    if (this.filtres.statut && this.filtres.statut !== 'Tous les statuts') {
      filtered = filtered.filter(d => d.verdict === this.filtres.statut);
    }

    // Filtre recherche candidat ou jury
    if (this.filtres.recherche?.trim()) {
      const search = this.filtres.recherche.trim().toLowerCase();
      filtered = filtered.filter(d => {
        const candidatNom = d.candidat?.nom?.toLowerCase() || '';
        const candidatPrenom = d.candidat?.prenom?.toLowerCase() || '';
        const juryNom = d.jury?.nom?.toLowerCase() || '';
        const juryPrenom = d.jury?.prenom?.toLowerCase() || '';
        return (
          (`${candidatNom} ${candidatPrenom}`.includes(search) ||
           `${candidatPrenom} ${candidatNom}`.includes(search) ||
           `${juryNom} ${juryPrenom}`.includes(search) ||
           `${juryPrenom} ${juryNom}`.includes(search))
        );
      });
    }

    this.totalDecisions = filtered.length;

    // Pagination
    const debut = (this.pageActuelle - 1) * this.decisionsParPage;
    const fin = debut + this.decisionsParPage;
    return filtered.slice(debut, fin);
  }

  get pages(): number[] {
    const totalPages = Math.ceil(this.totalDecisions / this.decisionsParPage);
    return Array(totalPages).fill(0).map((_, i) => i + 1);
  }

  changerPage(page: number | undefined): void {
    if (typeof page === 'number' && !isNaN(page)) {
      this.pageActuelle = page;
    }
  }

  voirDecision(decision: Decision): void {
    this.router.navigate(['/voir-decision', decision.id], { state: { decision } });
  }

  get minPage(): number {
    return Math.min(this.pageActuelle * this.decisionsParPage, this.totalDecisions);
  }

  getStatutColor(decision: Decision): string {
    switch ((decision.verdict || '').toUpperCase()) {
      case 'ADMIS':
        return 'success';
      case 'NON_ADMIS':
        return 'danger';
      case 'RATTRAPAGE':
        return 'warning';
      default:
        return 'medium';
    }
  }
}


