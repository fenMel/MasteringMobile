import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CandidatDecisionComponent } from './candidat-decision.component';

describe('CandidatDecisionComponent', () => {
  let component: CandidatDecisionComponent;
  let fixture: ComponentFixture<CandidatDecisionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CandidatDecisionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CandidatDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
