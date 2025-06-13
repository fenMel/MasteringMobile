"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.DecisionComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var DecisionComponent = /** @class */ (function () {
    function DecisionComponent(decisionService, router) {
        this.decisionService = decisionService;
        this.router = router;
        this.decisions = [];
        this.filtres = {
            statut: 'Tous les statuts',
            recherche: ''
        };
        this.optionsStatut = ['Tous les statuts', 'ADMIS', 'NON_ADMIS', 'RATTRAPAGE'];
        this.pageActuelle = 1;
        this.decisionsParPage = 5;
        this.totalDecisions = 0;
    }
    DecisionComponent.prototype.ngOnInit = function () {
        this.chargerDecisions();
    };
    DecisionComponent.prototype.chargerDecisions = function () {
        var _this = this;
        this.decisionService.getAllDecisions().subscribe({
            next: function (data) {
                _this.decisions = data;
                _this.totalDecisions = data.length;
            },
            error: function () {
                // Gère l'erreur (snackbar, etc.)
            }
        });
    };
    DecisionComponent.prototype.appliquerFiltres = function () {
        this.pageActuelle = 1;
    };
    Object.defineProperty(DecisionComponent.prototype, "decisionsAffichees", {
        get: function () {
            var _this = this;
            var _a;
            var filtered = __spreadArrays(this.decisions);
            // Filtre statut
            if (this.filtres.statut && this.filtres.statut !== 'Tous les statuts') {
                filtered = filtered.filter(function (d) { return d.verdict === _this.filtres.statut; });
            }
            // Filtre recherche candidat ou jury
            if ((_a = this.filtres.recherche) === null || _a === void 0 ? void 0 : _a.trim()) {
                var search_1 = this.filtres.recherche.trim().toLowerCase();
                filtered = filtered.filter(function (d) {
                    var _a, _b, _c, _d, _e, _f, _g, _h;
                    var candidatNom = ((_b = (_a = d.candidat) === null || _a === void 0 ? void 0 : _a.nom) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || '';
                    var candidatPrenom = ((_d = (_c = d.candidat) === null || _c === void 0 ? void 0 : _c.prenom) === null || _d === void 0 ? void 0 : _d.toLowerCase()) || '';
                    var juryNom = ((_f = (_e = d.jury) === null || _e === void 0 ? void 0 : _e.nom) === null || _f === void 0 ? void 0 : _f.toLowerCase()) || '';
                    var juryPrenom = ((_h = (_g = d.jury) === null || _g === void 0 ? void 0 : _g.prenom) === null || _h === void 0 ? void 0 : _h.toLowerCase()) || '';
                    return (((candidatNom + " " + candidatPrenom).includes(search_1) ||
                        (candidatPrenom + " " + candidatNom).includes(search_1) ||
                        (juryNom + " " + juryPrenom).includes(search_1) ||
                        (juryPrenom + " " + juryNom).includes(search_1)));
                });
            }
            this.totalDecisions = filtered.length;
            // Pagination
            var debut = (this.pageActuelle - 1) * this.decisionsParPage;
            var fin = debut + this.decisionsParPage;
            return filtered.slice(debut, fin);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DecisionComponent.prototype, "pages", {
        get: function () {
            var totalPages = Math.ceil(this.totalDecisions / this.decisionsParPage);
            return Array(totalPages).fill(0).map(function (_, i) { return i + 1; });
        },
        enumerable: false,
        configurable: true
    });
    DecisionComponent.prototype.changerPage = function (page) {
        if (typeof page === 'number' && !isNaN(page)) {
            this.pageActuelle = page;
        }
    };
    DecisionComponent.prototype.voirDecision = function (decision) {
        this.router.navigate(['/voir-decision', decision.id], { state: { decision: decision } });
    };
    Object.defineProperty(DecisionComponent.prototype, "minPage", {
        get: function () {
            return Math.min(this.pageActuelle * this.decisionsParPage, this.totalDecisions);
        },
        enumerable: false,
        configurable: true
    });
    DecisionComponent.prototype.getStatutColor = function (decision) {
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
    };
    DecisionComponent = __decorate([
        core_1.Component({
            selector: 'app-decision',
            standalone: true,
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule
            ],
            templateUrl: './decision.component.html',
            styleUrls: ['./decision.component.scss']
        })
    ], DecisionComponent);
    return DecisionComponent;
}());
exports.DecisionComponent = DecisionComponent;
