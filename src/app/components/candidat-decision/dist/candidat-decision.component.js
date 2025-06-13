"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CandidatDecisionComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var angular_1 = require("@ionic/angular");
var CandidatDecisionComponent = /** @class */ (function () {
    function CandidatDecisionComponent(authService, evaluationService, decisionService) {
        this.authService = authService;
        this.evaluationService = evaluationService;
        this.decisionService = decisionService;
        this.evaluationResults = [];
    }
    CandidatDecisionComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Récupérer les résultats d'évaluation si l'utilisateur est un candidat
        if (this.authService.isCandidat()) {
            var currentUser_1 = this.authService.getCurrentUser();
            if (currentUser_1 && currentUser_1.id) {
                // Récupérer les évaluations du candidat
                this.evaluationService.getEvaluationForCandidat(currentUser_1.id).subscribe({
                    next: function (results) {
                        // Récupérer les décisions associées à ce candidat
                        _this.decisionService.getDecisionsByCandidat(currentUser_1.id).subscribe({
                            next: function (decisions) {
                                // Pour chaque évaluation, ajoute le verdict correspondant (si trouvé)
                                _this.evaluationResults = results.map(function (evaluation) {
                                    var decision = decisions.find(function (d) { return d.evaluationId === evaluation.id; });
                                    return __assign(__assign({}, evaluation), { verdict: decision ? decision.verdict : 'Non disponible' });
                                });
                            },
                            error: function (err) {
                                console.error("Erreur lors de la récupération des décisions:", err);
                                // Si erreur, on garde les résultats sans verdict
                                _this.evaluationResults = results;
                            }
                        });
                    },
                    error: function (err) {
                        console.error("Erreur lors de la récupération des résultats d'évaluation:", err);
                    }
                });
            }
        }
    };
    CandidatDecisionComponent = __decorate([
        core_1.Component({
            selector: 'app-candidat-decision',
            templateUrl: './candidat-decision.component.html',
            styleUrls: ['./candidat-decision.component.scss'],
            standalone: true,
            imports: [
                common_1.CommonModule,
                angular_1.IonicModule
            ]
        })
    ], CandidatDecisionComponent);
    return CandidatDecisionComponent;
}());
exports.CandidatDecisionComponent = CandidatDecisionComponent;
