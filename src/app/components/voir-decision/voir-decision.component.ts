import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DecisionService } from '../../services/decision.service';
import { Decision } from '../decision/decision.model';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-voir-decision',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ],
  templateUrl: './voir-decision.component.html',
  styleUrls: ['./voir-decision.component.scss']
})
export class VoirDecisionComponent implements OnInit {
  @Input() decision: Decision | null = null;
  @Input() evaluationResults: any[] = [];
  @Input() setSousMenu: any;
  constructor(
    private route: ActivatedRoute,
    private decisionService: DecisionService,
    private router: Router,
        private decisionsService: DecisionService,
  
    private authService: AuthService,
    private location: Location
  ) {}
supprimerDecision(id: number) {
    const nomPrenom = this.authService.getUserFullName();
    console.log('Nom/prénom envoyé au backend :', nomPrenom);
    this.decisionsService.deleteDecision(id, nomPrenom).subscribe({
        next: () => {
            console.log('Suppression réussie pour la décision', id);
            this.evaluationResults = this.evaluationResults.filter(e => e.id !== id);

                  this.retourArriere();

        },
        error: (err) => {
            console.error('Erreur lors de la suppression :', err);
            // Add specific error handling
            if (err.status === 403) {
                console.error('Accès refusé - permissions insuffisantes');
            } else if (err.status === 404) {
                console.error('Décision non trouvée');
            }
            // Show user-friendly error message
        }
    });
}
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const stateDecision = navigation?.extras.state?.['decision'];
    if (stateDecision) {
      this.decision = stateDecision;
    } else {
      // fallback HTTP si pas de state
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.decisionService.getDecisionById(+id).subscribe({
          next: (data: Decision | null) => this.decision = data
        });
      }
    }
  }

  getStatutColor(decision: Decision): string {
    switch ((decision.verdict || '').toUpperCase()) {
      case 'ADMIS': return 'success';
      case 'NON_ADMIS': return 'danger';
      case 'RATTRAPAGE': return 'warning';
      default: return 'medium';
    }
  }

  retourArriere() {
    this.location.back();
  }
}


