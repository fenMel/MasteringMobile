import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GestionEvaluationComponent } from './gestion-evaluation.component';

describe('GestionEvaluationComponent', () => {
  let component: GestionEvaluationComponent;
  let fixture: ComponentFixture<GestionEvaluationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GestionEvaluationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
