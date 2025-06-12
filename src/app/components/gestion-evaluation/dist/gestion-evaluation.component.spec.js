"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var gestion_evaluation_component_1 = require("./gestion-evaluation.component");
describe('GestionEvaluationComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.waitForAsync(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [gestion_evaluation_component_1.GestionEvaluationComponent]
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(gestion_evaluation_component_1.GestionEvaluationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
