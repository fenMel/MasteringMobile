import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Evaluation, FiltresEvaluation } from './evaluation.model';
import { EvaluationService } from '../../services/evaluation.service';

import { IonicModule, ToastController } from '@ionic/angular';
import { AjouterEvaluationComponent } from '../ajouter-evaluation/ajouter-evaluation.component';

@Component({
  selector: 'app-gestion-evaluation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  templateUrl: './gestion-evaluation.component.html',
  styleUrls: ['./gestion-evaluation.component.scss']
})
export class GestionEvaluationComponent implements OnInit, OnDestroy {
  evaluations: Evaluation[] = [];
  totalEvaluations: number = 0;
  pageActuelle: number = 1;
  evaluationsParPage: number = 5;
showDatePicker = false;
  allCandidats: any[] = [];

  @Input() setSousMenu!: (menu: string) => void;

  filtres: any = {
    date: null,
    heure: '',
    statut: 'Tout les statuts',
    candidat: '',
    jury: '',
    recherche: ''
  };

  optionsDate = ['Toutes les dates', 'Aujourd\'hui', 'Cette semaine', 'Ce mois'];
  optionsStatut = ['Tout les statuts', 'Évalué', 'Non Évalué'];

  Math: Math = Math;

  modeVoir: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private evaluationService: EvaluationService,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) { }

  async showSuccess(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'success'
    });
    toast.present();
  }

  async showError(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 4000,
      color: 'danger'
    });
    toast.present();
  }

  ngOnInit(): void {
    this.chargerEvaluations();
    this.modeVoir = this.evaluationService.getViewMode();

    this.route.queryParams.subscribe(params => {
      if (params['suppressionSuccess'] === '1') {
        this.showSuccess('Suppression réussie');
      }
    });

    this.evaluationService.refreshList$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.chargerEvaluations(); // Recharge la liste à chaque événement
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  chargerEvaluations(): void {
    this.evaluationService.getEvaluationsFiltered(
      this.filtres.dateRange,
      this.filtres.statut,
      this.filtres.candidat
    ).subscribe({
      next: (data: any[]) => {
        const candidatIds = [...new Set(data.map(e => e.candidatId))];
        const juryIds = [...new Set(data.map(e => e.juryId))];

        if (candidatIds.length > 0 && juryIds.length > 0) {
          forkJoin([
            this.evaluationService.getCandidatsParIds(candidatIds),
            this.evaluationService.getJurysParIds(juryIds)
          ]).subscribe({
            next: ([candidatsArrays, jurysArrays]) => {
              // Correction flatMap + typage explicite
              const allCandidatsArr: any[] = [];
              for (const c of candidatsArrays) {
                if (Array.isArray(c)) {
                  allCandidatsArr.push(...c);
                } else {
                  allCandidatsArr.push(c);
                }
              }
              const allCandidats = allCandidatsArr.filter((c: any) => c?.id);

              const allJurys = jurysArrays.filter((j: any) => j?.id);

              this.evaluations = data.map((evaluation: any) => {
                const candidatInfo =
                  allCandidats.find((c: any) => String(c.candidat?.id) === String(evaluation.candidatId))?.candidat ||
                  allCandidats.find((c: any) => String(c.id) === String(evaluation.candidatId));

                const juryInfo = allJurys.find((j: any) => String(j.id) === String(evaluation.juryId));

                return {
                  id: evaluation.id,
                  candidatId: evaluation.candidatId,
                  candidat: {
                    nom: candidatInfo?.nom || 'Nom inconnu',
                    prenom: candidatInfo?.prenom || 'Prénom inconnu'
                  },
                  jury: {
                    nom: juryInfo?.nom || 'Nom inconnu',
                    prenom: juryInfo?.prenom || 'Prénom inconnu'
                  },
                  sujet: evaluation.sujet || 'Sujet non spécifié',
                  dateHeure: evaluation.dateHeure ? new Date(evaluation.dateHeure) : null,
                  statut: evaluation.moyenne ? 'Évalué' : 'Non Évalué',
                  juryId: evaluation.juryId || null
                };
              });

              this.totalEvaluations = this.evaluations.length;
            },
            error: () => {
              this.mapperEvaluationsSansDetails(data);
            }
          });
        } else {
          this.mapperEvaluationsSansDetails(data);
        }
      },
      error: () => {
        this.evaluations = [];
        this.totalEvaluations = 0;
      }
    });
  }

  private mapperEvaluationsSansDetails(data: any[]): void {
    this.evaluations = data.map(evaluation => ({
      id: evaluation.id,
      candidatId: evaluation.candidat?.id,
      candidat: {
        nom: evaluation.candidat?.nom || 'Nom inconnu',
        prenom: evaluation.candidat?.prenom || 'Prénom inconnu'
      },
      jury: {
        nom: evaluation.jury?.nom || 'Nom inconnu',
        prenom: evaluation.jury?.prenom || 'Prénom inconnu'
      },
      sujet: evaluation.sujet || 'Sujet non défini',
      dateHeure: evaluation.dateHeure ? new Date(evaluation.dateHeure) : null,
      statut: evaluation.moyenne ? 'Évalué' : 'Non Évalué',
      juryId: evaluation.jury?.id ?? null
    }));
    this.totalEvaluations = this.evaluations.length;
  }

  appliquerFiltres(): void {
    this.pageActuelle = 1;
    this.chargerEvaluations();
  }

  changerPage(page: number): void {
    this.pageActuelle = page;
  }

  get evaluationsAffichees(): Evaluation[] {
    const currentUser = this.evaluationService.getCurrentUser();
    const juryId = currentUser?.id;
    let filtered = [...this.evaluations];

    // Date filter
    if (this.filtres.date) {
      const filtreDate = new Date(this.filtres.date);
      filtered = filtered.filter(e => {
        if (!e.dateHeure) return false;
        const evalDate = new Date(e.dateHeure);
        return evalDate.toDateString() === filtreDate.toDateString();
      });
    }

    // Time filter
    if (this.filtres.heure) {
      const [h, m] = this.filtres.heure.split(':');
      filtered = filtered.filter(e => {
        if (!e.dateHeure) return false;
        const evalDate = new Date(e.dateHeure);
        return evalDate.getHours() === +h && evalDate.getMinutes() === +m;
      });
    }

    // Status filter
    if (this.filtres.statut && this.filtres.statut !== 'Tout les statuts') {
      filtered = filtered.filter(e => e.statut === this.filtres.statut);
    }

    // Candidate name filter
    if (this.filtres.candidat?.trim()) {
      const search = this.filtres.candidat.trim().toLowerCase();
      filtered = filtered.filter(e =>
        `${e.candidat.nom} ${e.candidat.prenom}`.toLowerCase().includes(search) ||
        `${e.candidat.prenom} ${e.candidat.nom}`.toLowerCase().includes(search)
      );
    }

    // Jury/candidat search
    if (this.filtres.recherche?.trim()) {
      const search = this.filtres.recherche.trim().toLowerCase();
      filtered = filtered.filter(e =>
        (`${e.candidat.nom} ${e.candidat.prenom}`.toLowerCase().includes(search) ||
         `${e.candidat.prenom} ${e.candidat.nom}`.toLowerCase().includes(search) ||
         `${e.jury.nom} ${e.jury.prenom}`.toLowerCase().includes(search) ||
         `${e.jury.prenom} ${e.jury.nom}`.toLowerCase().includes(search))
      );
    }

    this.totalEvaluations = filtered.length;
    const debut = (this.pageActuelle - 1) * this.evaluationsParPage;
    const fin = debut + this.evaluationsParPage;
    return filtered.slice(debut, fin);
  }

  get pages(): number[] {
    const totalPages = Math.ceil(this.totalEvaluations / this.evaluationsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  nettoyerRecherche(): void {
    this.filtres.candidat = '';
    this.appliquerFiltres();
  }

  evaluer(evaluation: Evaluation): void {
    this.evaluationService.setSelectedCandidatId(evaluation.candidatId);
    this.evaluationService.setSelectedEvaluationId(evaluation.id);
    this.evaluationService.setViewMode(false);

    // Redirection avec l'ID de l'évaluation
    this.router.navigate(['/ajouter-evaluation', evaluation.id]);
  }

  voirEvaluation(evaluation: Evaluation): void {
    this.evaluationService.setViewMode(true);
    this.evaluationService.setSelectedEvaluationId(evaluation.id);
    this.evaluationService.setSelectedCandidatId(evaluation.candidatId);

    // Redirection avec l'ID de l'évaluation
    this.router.navigate(['/ajouter-evaluation', evaluation.id]);
  }

  getNomPrenomCandidat(candidat: { nom: string; prenom: string }): string {
    if (!candidat) return '';
    return `${candidat.nom ?? ''} ${candidat.prenom ?? ''}`.trim();
  }

  formatDate(date: Date | null): string {
    if (!date) return 'Date non définie';
    try {
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch {
      return 'Date invalide';
    }
  }

  logEvaluation(evaluation: Evaluation): void {
    console.log('Détails de l\'évaluation:', {
      id: evaluation.id,
      sujet: evaluation.sujet,
      dateHeure: evaluation.dateHeure,
      statut: evaluation.statut
    });
  }
}

const routes: Routes = [
  // ... autres routes ...
  { path: 'ajouter-evaluation', component: AjouterEvaluationComponent },
  // ... autres routes ...
];