import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AjouterEvaluationComponent } from './ajouter-evaluation.component';

describe('AjouterEvaluationComponent', () => {
  let component: AjouterEvaluationComponent;
  let fixture: ComponentFixture<AjouterEvaluationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AjouterEvaluationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
