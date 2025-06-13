import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DecisionService } from '../../services/decision.service';
import { Decision } from '../decision/decision.model';
import { Location } from '@angular/common';

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

  constructor(
    private route: ActivatedRoute,
    private decisionService: DecisionService,
    private router: Router,
    private location: Location
  ) {}

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


