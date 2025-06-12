"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var evaluation_service_1 = require("./evaluation.service");
describe('EvaluationService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(evaluation_service_1.EvaluationService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
