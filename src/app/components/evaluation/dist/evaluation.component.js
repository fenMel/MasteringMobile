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
exports.EvaluationComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var angular_1 = require("@ionic/angular");
var EvaluationComponent = /** @class */ (function () {
    function EvaluationComponent(evaluationService, router, evaluationState) {
        this.evaluationService = evaluationService;
        this.router = router;
        this.evaluationState = evaluationState;
        this.destroy$ = new rxjs_1.Subject();
        this.ongletActif = 'aEvaluer';
        this.evaluations = [];
        this.totalEvaluations = 0;
        this.pageActuelle = 1;
        this.evaluationsParPage = 5;
        this.allCandidats = [];
        this.filtres = {
            date: null,
            heure: '',
            statut: 'Tout les statuts',
            candidat: ''
        };
        this.optionsDate = ['Toutes les dates', 'Aujourd\'hui', 'Cette semaine', 'Ce mois'];
        this.optionsStatut = ['Tout les statuts', 'Évalué', 'Non Évalué'];
        this.Math = Math;
        this.modeVoir = false;
        this.candidatSelectionne = null;
    }
    EvaluationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.chargerEvaluations();
        this.modeVoir = this.evaluationService.getViewMode();
        // Abonnement à l'événement de rafraîchissement
        this.evaluationService.refreshList$
            .pipe(operators_1.takeUntil(this.destroy$))
            .subscribe(function () {
            _this.chargerEvaluations();
        });
    };
    EvaluationComponent.prototype.ngDoCheck = function () {
        if (this.evaluationState.resetEvaluations) {
            this.evaluations = [];
            this.filtres = { statut: 'Tout les statuts', candidat: '' };
            this.evaluationState.resetEvaluations = false;
        }
    };
    EvaluationComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    EvaluationComponent.prototype.chargerEvaluations = function () {
        var _this = this;
        this.evaluationService.getEvaluationsFiltered(this.filtres.dateRange, this.filtres.statut, this.filtres.candidat).subscribe(function (data) {
            var candidatIds = __spreadArrays(new Set(data.map(function (evaluation) { return evaluation.candidatId; })));
            if (candidatIds.length > 0) {
                _this.evaluationService.getCandidatsParIds(candidatIds).subscribe(function (candidatsArrays) {
                    var allCandidats = [];
                    candidatsArrays.forEach(function (candidatData) {
                        if (Array.isArray(candidatData) && candidatData.length > 0) {
                            candidatData.forEach(function (candidat) {
                                if (candidat && candidat.id) {
                                    allCandidats.push(candidat);
                                }
                            });
                        }
                        else if (candidatData && candidatData.id) {
                            allCandidats.push(candidatData);
                        }
                    });
                    _this.evaluations = data.map(function (evaluation) {
                        var _a, _b, _c, _d;
                        var candidatInfo = (_a = allCandidats.find(function (c) { var _a; return String((_a = c.candidat) === null || _a === void 0 ? void 0 : _a.id) === String(evaluation.candidatId); })) === null || _a === void 0 ? void 0 : _a.candidat;
                        return {
                            id: evaluation.id,
                            candidatId: evaluation.candidatId,
                            candidat: {
                                nom: (candidatInfo === null || candidatInfo === void 0 ? void 0 : candidatInfo.nom) || 'Nom inconnu',
                                prenom: (candidatInfo === null || candidatInfo === void 0 ? void 0 : candidatInfo.prenom) || 'Prénom inconnu'
                            },
                            sujet: evaluation.sujet || 'Sujet non spécifié',
                            dateHeure: evaluation.dateHeure ? new Date(evaluation.dateHeure) : new Date(),
                            // Ajoute ici pour accès direct dans le template :
                            date: evaluation.dateHeure ? new Date(evaluation.dateHeure).toLocaleDateString() : '',
                            heure: evaluation.dateHeure ? new Date(evaluation.dateHeure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
                            statut: evaluation.moyenne ? 'Évalué' : 'Non Évalué',
                            juryId: (_d = (_b = evaluation.juryId) !== null && _b !== void 0 ? _b : (_c = evaluation.jury) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : null // Ajout du juryId pour le filtre
                        };
                    });
                    _this.totalEvaluations = _this.evaluations.length;
                }, function (error) {
                    console.error('Erreur lors de la récupération des candidats:', error);
                });
            }
            else {
                _this.evaluations = [];
                _this.totalEvaluations = 0;
            }
        }, function (error) {
            console.error('Erreur lors du chargement des évaluations:', error);
        });
    };
    EvaluationComponent.prototype.appliquerFiltres = function () {
        this.pageActuelle = 1;
        this.chargerEvaluations();
    };
    EvaluationComponent.prototype.changerPage = function (page) {
        this.pageActuelle = page;
    };
    Object.defineProperty(EvaluationComponent.prototype, "evaluationsAffichees", {
        get: function () {
            var _this = this;
            // 1. Récupère l'ID du jury connecté
            var currentUser = this.evaluationService.getCurrentUser();
            var juryId = currentUser === null || currentUser === void 0 ? void 0 : currentUser.id;
            var filtered = this.evaluations;
            if (this.filtres.date) {
                filtered = filtered.filter(function (e) {
                    if (!e.dateHeure)
                        return false;
                    var evalDate = new Date(e.dateHeure);
                    var filtreDate = new Date(_this.filtres.date);
                    return evalDate.getFullYear() === filtreDate.getFullYear() &&
                        evalDate.getMonth() === filtreDate.getMonth() &&
                        evalDate.getDate() === filtreDate.getDate();
                });
            }
            // 4. Filtre par heure
            if (this.filtres.heure) {
                filtered = filtered.filter(function (e) {
                    var evalDate = e.dateHeure ? new Date(e.dateHeure) : null;
                    var heure = _this.filtres.heure;
                    return evalDate &&
                        evalDate.getHours().toString().padStart(2, '0') + ':' +
                            evalDate.getMinutes().toString().padStart(2, '0') === heure;
                });
            }
            // 2. Filtre par jury connecté
            if (juryId) {
                filtered = filtered.filter(function (e) { return e.juryId === juryId; });
            }
            // 3. Filtre par statut
            if (this.filtres.statut && this.filtres.statut !== 'Tout les statuts') {
                filtered = filtered.filter(function (e) { return e.statut === _this.filtres.statut; });
            }
            // 4. Filtre par nom/prénom du candidat
            if (this.filtres.candidat && this.filtres.candidat.trim() !== '') {
                var search_1 = this.filtres.candidat.trim().toLowerCase();
                filtered = filtered.filter(function (e) {
                    return (e.candidat.nom + ' ' + e.candidat.prenom).toLowerCase().includes(search_1) ||
                        (e.candidat.prenom + ' ' + e.candidat.nom).toLowerCase().includes(search_1);
                });
            }
            this.totalEvaluations = filtered.length;
            // 5. Pagination
            var totalPages = Math.ceil(this.totalEvaluations / this.evaluationsParPage) || 1;
            if (this.pageActuelle > totalPages) {
                this.pageActuelle = 1;
            }
            var debut = (this.pageActuelle - 1) * this.evaluationsParPage;
            var fin = debut + this.evaluationsParPage;
            return filtered.slice(debut, fin);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EvaluationComponent.prototype, "pages", {
        get: function () {
            var totalPages = Math.ceil(this.totalEvaluations / this.evaluationsParPage);
            return Array(totalPages).fill(0).map(function (_, index) { return index + 1; });
        },
        enumerable: false,
        configurable: true
    });
    EvaluationComponent.prototype.nettoyerRecherche = function () {
        this.filtres.candidat = '';
        this.appliquerFiltres();
    };
    EvaluationComponent.prototype.evaluer = function (evaluation) {
        this.evaluationService.setSelectedCandidatId(evaluation.candidatId);
        this.evaluationService.setSelectedEvaluationId(evaluation.id);
        this.evaluationService.setViewMode(false);
        this.router.navigate(['/ajouter-evaluation', evaluation.id]);
    };
    EvaluationComponent.prototype.voirEvaluation = function (evaluation) {
        var _this = this;
        this.evaluationService.setViewMode(true);
        if (evaluation && evaluation.id && evaluation.candidatId) {
            this.evaluationService.setSelectedEvaluationId(evaluation.id);
            this.evaluationService.setSelectedCandidatId(evaluation.candidatId);
            this.evaluationService.setViewMode(true);
            var currentUser = this.evaluationService.getCurrentUser();
            if (currentUser) {
                var juryId = currentUser.id;
                console.log('Jury ID connecté :', juryId);
            }
            else {
                console.warn('Aucun utilisateur connecté trouvé.');
            }
            this.evaluationService.getCandidat(evaluation.candidatId).subscribe(function (candidatInfo) {
                _this.evaluationService.setSelectedCandidatDetails(candidatInfo);
            }, function (error) {
                _this.evaluationService.setSelectedCandidatDetails(null);
            });
            this.router.navigate(['/ajouter-evaluation', evaluation.id, { mode: 'voir' }]);
        }
        else {
            console.error('L\'évaluation ne contient pas d\'ID ou de candidatId valide');
        }
    };
    EvaluationComponent.prototype.getNomPrenomCandidat = function (candidat) {
        var _a, _b;
        if (!candidat)
            return '';
        return (((_a = candidat.nom) !== null && _a !== void 0 ? _a : '') + " " + ((_b = candidat.prenom) !== null && _b !== void 0 ? _b : '')).trim();
    };
    __decorate([
        core_1.Input()
    ], EvaluationComponent.prototype, "setSousMenu");
    EvaluationComponent = __decorate([
        core_1.Component({
            standalone: true,
            selector: 'app-evaluation',
            templateUrl: './evaluation.component.html',
            styleUrls: ['./evaluation.component.scss'],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                // IonIcon,
                // IonButton,
                angular_1.IonicModule,
            ]
        })
    ], EvaluationComponent);
    return EvaluationComponent;
}());
exports.EvaluationComponent = EvaluationComponent;
