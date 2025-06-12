"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.GestionEvaluationComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var angular_1 = require("@ionic/angular");
var ajouter_evaluation_component_1 = require("../ajouter-evaluation/ajouter-evaluation.component");
var GestionEvaluationComponent = /** @class */ (function () {
    function GestionEvaluationComponent(evaluationService, router, route, toastController) {
        this.evaluationService = evaluationService;
        this.router = router;
        this.route = route;
        this.toastController = toastController;
        this.evaluations = [];
        this.totalEvaluations = 0;
        this.pageActuelle = 1;
        this.evaluationsParPage = 5;
        this.showDatePicker = false;
        this.allCandidats = [];
        this.filtres = {
            date: null,
            heure: '',
            statut: 'Tout les statuts',
            candidat: '',
            jury: '',
            recherche: ''
        };
        this.optionsDate = ['Toutes les dates', 'Aujourd\'hui', 'Cette semaine', 'Ce mois'];
        this.optionsStatut = ['Tout les statuts', 'Évalué', 'Non Évalué'];
        this.Math = Math;
        this.modeVoir = false;
        this.destroy$ = new rxjs_1.Subject();
    }
    GestionEvaluationComponent.prototype.showSuccess = function (message) {
        return __awaiter(this, void 0, Promise, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            duration: 3000,
                            color: 'success'
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    GestionEvaluationComponent.prototype.showError = function (message) {
        return __awaiter(this, void 0, Promise, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            duration: 4000,
                            color: 'danger'
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    GestionEvaluationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.chargerEvaluations();
        this.modeVoir = this.evaluationService.getViewMode();
        this.route.queryParams.subscribe(function (params) {
            if (params['suppressionSuccess'] === '1') {
                _this.showSuccess('Suppression réussie');
            }
        });
        this.evaluationService.refreshList$
            .pipe(operators_1.takeUntil(this.destroy$))
            .subscribe(function () {
            _this.chargerEvaluations(); // Recharge la liste à chaque événement
        });
    };
    GestionEvaluationComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    GestionEvaluationComponent.prototype.chargerEvaluations = function () {
        var _this = this;
        this.evaluationService.getEvaluationsFiltered(this.filtres.dateRange, this.filtres.statut, this.filtres.candidat).subscribe({
            next: function (data) {
                var candidatIds = __spreadArrays(new Set(data.map(function (e) { return e.candidatId; })));
                var juryIds = __spreadArrays(new Set(data.map(function (e) { return e.juryId; })));
                if (candidatIds.length > 0 && juryIds.length > 0) {
                    rxjs_1.forkJoin([
                        _this.evaluationService.getCandidatsParIds(candidatIds),
                        _this.evaluationService.getJurysParIds(juryIds)
                    ]).subscribe({
                        next: function (_a) {
                            var candidatsArrays = _a[0], jurysArrays = _a[1];
                            // Correction flatMap + typage explicite
                            var allCandidatsArr = [];
                            for (var _i = 0, candidatsArrays_1 = candidatsArrays; _i < candidatsArrays_1.length; _i++) {
                                var c = candidatsArrays_1[_i];
                                if (Array.isArray(c)) {
                                    allCandidatsArr.push.apply(allCandidatsArr, c);
                                }
                                else {
                                    allCandidatsArr.push(c);
                                }
                            }
                            var allCandidats = allCandidatsArr.filter(function (c) { return c === null || c === void 0 ? void 0 : c.id; });
                            var allJurys = jurysArrays.filter(function (j) { return j === null || j === void 0 ? void 0 : j.id; });
                            _this.evaluations = data.map(function (evaluation) {
                                var _a;
                                var candidatInfo = ((_a = allCandidats.find(function (c) { var _a; return String((_a = c.candidat) === null || _a === void 0 ? void 0 : _a.id) === String(evaluation.candidatId); })) === null || _a === void 0 ? void 0 : _a.candidat) ||
                                    allCandidats.find(function (c) { return String(c.id) === String(evaluation.candidatId); });
                                var juryInfo = allJurys.find(function (j) { return String(j.id) === String(evaluation.juryId); });
                                return {
                                    id: evaluation.id,
                                    candidatId: evaluation.candidatId,
                                    candidat: {
                                        nom: (candidatInfo === null || candidatInfo === void 0 ? void 0 : candidatInfo.nom) || 'Nom inconnu',
                                        prenom: (candidatInfo === null || candidatInfo === void 0 ? void 0 : candidatInfo.prenom) || 'Prénom inconnu'
                                    },
                                    jury: {
                                        nom: (juryInfo === null || juryInfo === void 0 ? void 0 : juryInfo.nom) || 'Nom inconnu',
                                        prenom: (juryInfo === null || juryInfo === void 0 ? void 0 : juryInfo.prenom) || 'Prénom inconnu'
                                    },
                                    sujet: evaluation.sujet || 'Sujet non spécifié',
                                    dateHeure: evaluation.dateHeure ? new Date(evaluation.dateHeure) : null,
                                    statut: evaluation.moyenne ? 'Évalué' : 'Non Évalué',
                                    juryId: evaluation.juryId || null
                                };
                            });
                            _this.totalEvaluations = _this.evaluations.length;
                        },
                        error: function () {
                            _this.mapperEvaluationsSansDetails(data);
                        }
                    });
                }
                else {
                    _this.mapperEvaluationsSansDetails(data);
                }
            },
            error: function () {
                _this.evaluations = [];
                _this.totalEvaluations = 0;
            }
        });
    };
    GestionEvaluationComponent.prototype.mapperEvaluationsSansDetails = function (data) {
        this.evaluations = data.map(function (evaluation) {
            var _a, _b, _c, _d, _e, _f, _g;
            return ({
                id: evaluation.id,
                candidatId: (_a = evaluation.candidat) === null || _a === void 0 ? void 0 : _a.id,
                candidat: {
                    nom: ((_b = evaluation.candidat) === null || _b === void 0 ? void 0 : _b.nom) || 'Nom inconnu',
                    prenom: ((_c = evaluation.candidat) === null || _c === void 0 ? void 0 : _c.prenom) || 'Prénom inconnu'
                },
                jury: {
                    nom: ((_d = evaluation.jury) === null || _d === void 0 ? void 0 : _d.nom) || 'Nom inconnu',
                    prenom: ((_e = evaluation.jury) === null || _e === void 0 ? void 0 : _e.prenom) || 'Prénom inconnu'
                },
                sujet: evaluation.sujet || 'Sujet non défini',
                dateHeure: evaluation.dateHeure ? new Date(evaluation.dateHeure) : null,
                statut: evaluation.moyenne ? 'Évalué' : 'Non Évalué',
                juryId: (_g = (_f = evaluation.jury) === null || _f === void 0 ? void 0 : _f.id) !== null && _g !== void 0 ? _g : null
            });
        });
        this.totalEvaluations = this.evaluations.length;
    };
    GestionEvaluationComponent.prototype.appliquerFiltres = function () {
        this.pageActuelle = 1;
        this.chargerEvaluations();
    };
    GestionEvaluationComponent.prototype.changerPage = function (page) {
        this.pageActuelle = page;
    };
    Object.defineProperty(GestionEvaluationComponent.prototype, "evaluationsAffichees", {
        get: function () {
            var _this = this;
            var _a, _b;
            var currentUser = this.evaluationService.getCurrentUser();
            var juryId = currentUser === null || currentUser === void 0 ? void 0 : currentUser.id;
            var filtered = __spreadArrays(this.evaluations);
            // Date filter
            if (this.filtres.date) {
                var filtreDate_1 = new Date(this.filtres.date);
                filtered = filtered.filter(function (e) {
                    if (!e.dateHeure)
                        return false;
                    var evalDate = new Date(e.dateHeure);
                    return evalDate.toDateString() === filtreDate_1.toDateString();
                });
            }
            // Time filter
            if (this.filtres.heure) {
                var _c = this.filtres.heure.split(':'), h_1 = _c[0], m_1 = _c[1];
                filtered = filtered.filter(function (e) {
                    if (!e.dateHeure)
                        return false;
                    var evalDate = new Date(e.dateHeure);
                    return evalDate.getHours() === +h_1 && evalDate.getMinutes() === +m_1;
                });
            }
            // Status filter
            if (this.filtres.statut && this.filtres.statut !== 'Tout les statuts') {
                filtered = filtered.filter(function (e) { return e.statut === _this.filtres.statut; });
            }
            // Candidate name filter
            if ((_a = this.filtres.candidat) === null || _a === void 0 ? void 0 : _a.trim()) {
                var search_1 = this.filtres.candidat.trim().toLowerCase();
                filtered = filtered.filter(function (e) {
                    return (e.candidat.nom + " " + e.candidat.prenom).toLowerCase().includes(search_1) ||
                        (e.candidat.prenom + " " + e.candidat.nom).toLowerCase().includes(search_1);
                });
            }
            // Jury/candidat search
            if ((_b = this.filtres.recherche) === null || _b === void 0 ? void 0 : _b.trim()) {
                var search_2 = this.filtres.recherche.trim().toLowerCase();
                filtered = filtered.filter(function (e) {
                    return ((e.candidat.nom + " " + e.candidat.prenom).toLowerCase().includes(search_2) ||
                        (e.candidat.prenom + " " + e.candidat.nom).toLowerCase().includes(search_2) ||
                        (e.jury.nom + " " + e.jury.prenom).toLowerCase().includes(search_2) ||
                        (e.jury.prenom + " " + e.jury.nom).toLowerCase().includes(search_2));
                });
            }
            this.totalEvaluations = filtered.length;
            var debut = (this.pageActuelle - 1) * this.evaluationsParPage;
            var fin = debut + this.evaluationsParPage;
            return filtered.slice(debut, fin);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GestionEvaluationComponent.prototype, "pages", {
        get: function () {
            var totalPages = Math.ceil(this.totalEvaluations / this.evaluationsParPage);
            return Array(totalPages).fill(0).map(function (_, index) { return index + 1; });
        },
        enumerable: false,
        configurable: true
    });
    GestionEvaluationComponent.prototype.nettoyerRecherche = function () {
        this.filtres.candidat = '';
        this.appliquerFiltres();
    };
    GestionEvaluationComponent.prototype.evaluer = function (evaluation) {
        this.evaluationService.setSelectedCandidatId(evaluation.candidatId);
        this.evaluationService.setSelectedEvaluationId(evaluation.id);
        this.evaluationService.setViewMode(false);
        // Redirection avec l'ID de l'évaluation
        this.router.navigate(['/ajouter-evaluation', evaluation.id]);
    };
    GestionEvaluationComponent.prototype.voirEvaluation = function (evaluation) {
        this.evaluationService.setViewMode(true);
        this.evaluationService.setSelectedEvaluationId(evaluation.id);
        this.evaluationService.setSelectedCandidatId(evaluation.candidatId);
        // Redirection avec l'ID de l'évaluation
        this.router.navigate(['/ajouter-evaluation', evaluation.id]);
    };
    GestionEvaluationComponent.prototype.getNomPrenomCandidat = function (candidat) {
        var _a, _b;
        if (!candidat)
            return '';
        return (((_a = candidat.nom) !== null && _a !== void 0 ? _a : '') + " " + ((_b = candidat.prenom) !== null && _b !== void 0 ? _b : '')).trim();
    };
    GestionEvaluationComponent.prototype.formatDate = function (date) {
        if (!date)
            return 'Date non définie';
        try {
            return new Intl.DateTimeFormat('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
        }
        catch (_a) {
            return 'Date invalide';
        }
    };
    GestionEvaluationComponent.prototype.logEvaluation = function (evaluation) {
        console.log('Détails de l\'évaluation:', {
            id: evaluation.id,
            sujet: evaluation.sujet,
            dateHeure: evaluation.dateHeure,
            statut: evaluation.statut
        });
    };
    __decorate([
        core_1.Input()
    ], GestionEvaluationComponent.prototype, "setSousMenu");
    GestionEvaluationComponent = __decorate([
        core_1.Component({
            selector: 'app-gestion-evaluation',
            standalone: true,
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule
            ],
            templateUrl: './gestion-evaluation.component.html',
            styleUrls: ['./gestion-evaluation.component.scss']
        })
    ], GestionEvaluationComponent);
    return GestionEvaluationComponent;
}());
exports.GestionEvaluationComponent = GestionEvaluationComponent;
var routes = [
    // ... autres routes ...
    { path: 'ajouter-evaluation', component: ajouter_evaluation_component_1.AjouterEvaluationComponent },
];
