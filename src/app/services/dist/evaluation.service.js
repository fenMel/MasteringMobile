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
exports.EvaluationService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var rxjs_2 = require("rxjs");
var environment_1 = require("../../environments/environment");
var EvaluationService = /** @class */ (function () {
    function EvaluationService(authService, http) {
        this.authService = authService;
        this.http = http;
        this.apiUrl = environment_1.environment.apiUrl;
        this.selectedCandidatId = null;
        this.selectedEvaluationId = null;
        this.viewMode = false;
        this.selectedCandidatDetailsSource = new rxjs_1.BehaviorSubject(null);
        this.selectedCandidatDetails$ = this.selectedCandidatDetailsSource.asObservable();
        this.refreshListSubject = new rxjs_1.Subject();
        this.refreshList$ = this.refreshListSubject.asObservable();
    }
    EvaluationService.prototype.getAuthHeaders = function () {
        return new http_1.HttpHeaders({
            Authorization: 'Bearer ' + this.authService.getToken()
        });
    };
    EvaluationService.prototype.getAllEvaluations = function () {
        return this.http.get(this.apiUrl + "/api/evaluations", {
            headers: this.getAuthHeaders()
        });
    };
    EvaluationService.prototype.getEvaluationsFiltered = function (dateRange, statut, candidat) {
        var params = new http_1.HttpParams();
        if (dateRange && dateRange !== 'Toutes les dates')
            params = params.set('dateRange', dateRange);
        if (statut && statut !== 'Tout les statuts')
            params = params.set('statut', statut);
        if (candidat)
            params = params.set('candidat', candidat);
        return this.http.get(this.apiUrl + "/api/evaluations", {
            headers: this.getAuthHeaders(),
            params: params
        }).pipe(rxjs_1.map(function (data) {
            console.log('Données brutes de l\'API:', data); // Debug
            return data.map(function (e) {
                console.log('Mapping évaluation dans service:', e); // Debug
                return __assign(__assign({}, e), { dateHeure: e.dateHeure ? new Date(e.dateHeure) : null, sujet: e.sujet || 'Sujet non spécifié', statut: e.moyenne ? 'Évalué' : 'Non Évalué' });
            });
        }), rxjs_1.catchError(function (error) {
            console.error('Erreur dans getEvaluationsFiltered:', error);
            return rxjs_2.of([]); // Retourner un tableau vide en cas d'erreur
        }));
    };
    EvaluationService.prototype.updateEvaluation = function (id, evaluation) {
        return this.http.put(this.apiUrl + "/api/evaluations/" + id, evaluation, {
            headers: this.getAuthHeaders()
        });
    };
    EvaluationService.prototype.evaluer = function (id) {
        return this.http.put(this.apiUrl + "/api/evaluations/" + id + "/evaluer", {}, {
            headers: this.getAuthHeaders()
        });
    };
    EvaluationService.prototype.createEvaluation = function (evaluation) {
        return this.http.post(this.apiUrl + "/api/evaluations", evaluation, {
            headers: this.getAuthHeaders()
        });
    };
    EvaluationService.prototype.getCurrentUser = function () {
        var token = this.authService.getToken();
        if (token) {
            var userData = localStorage.getItem('currentUser');
            return userData ? JSON.parse(userData) : null;
        }
        return null;
    };
    EvaluationService.prototype.getEvaluation = function (id) {
        return this.http.get(this.apiUrl + "/api/evaluations/" + id, {
            headers: this.getAuthHeaders()
        });
    };
    // --- CANDIDATS ---
    EvaluationService.prototype.getCandidat = function (id) {
        return this.http.get(this.apiUrl + "/api/evaluations/candidat/" + id, {
            headers: this.getAuthHeaders()
        }).pipe(rxjs_1.catchError(function (error) {
            console.error('Erreur lors de la récupération du candidat:', error);
            return rxjs_2.of(null);
        }));
    };
    EvaluationService.prototype.getJury = function (id) {
        return this.http.get(this.apiUrl + "/api/evaluations/jury-info/" + id, { headers: this.getAuthHeaders() }).pipe(rxjs_1.catchError(function (error) {
            console.error('Erreur lors de la récupération du jury:', error);
            return rxjs_2.of({ id: id, nom: 'Nom inconnu', prenom: 'Prénom inconnu' });
        }));
    };
    EvaluationService.prototype.getCandidats = function () {
        return this.http.get(this.apiUrl + "/api/evaluations/candidat", {
            headers: this.getAuthHeaders()
        });
    };
    EvaluationService.prototype.getCandidatsPresents = function () {
        var params = new http_1.HttpParams().set('present', 'true');
        return this.http.get(this.apiUrl + "/api/evaluations/candidat", {
            headers: this.getAuthHeaders(),
            params: params
        });
    };
    EvaluationService.prototype.getCandidatsParDate = function (date) {
        var params = new http_1.HttpParams().set('date', date).set('present', 'true');
        return this.http.get(this.apiUrl + "/api/evaluations/candidat", {
            headers: this.getAuthHeaders(),
            params: params
        });
    };
    EvaluationService.prototype.getCandidatsParIds = function (ids) {
        var _this = this;
        var requests = ids.map(function (id) { return _this.getCandidat(id); });
        return rxjs_1.forkJoin(requests);
    };
    EvaluationService.prototype.getJurysParIds = function (juryIds) {
        var _this = this;
        var requests = juryIds.map(function (id) { return _this.getJury(id); });
        return rxjs_1.forkJoin(requests);
    };
    // --- EVALUATIONS PAR CANDIDAT ---
    EvaluationService.prototype.getEvaluationForCandidat = function (candidatId) {
        return this.http.get(this.apiUrl + "/api/evaluations/candidat/" + candidatId, {
            headers: this.getAuthHeaders()
        });
    };
    EvaluationService.prototype.getCandidatId = function (id) {
        return this.http.get(this.apiUrl + "/api/evaluations/candidat/" + id, {
            headers: this.getAuthHeaders()
        });
    };
    // --- SELECTIONS ET MODES ---
    EvaluationService.prototype.setSelectedCandidatId = function (id) {
        this.selectedCandidatId = id;
        console.log('Candidat ID sélectionné:', id);
    };
    EvaluationService.prototype.getSelectedCandidatId = function () {
        return this.selectedCandidatId;
    };
    EvaluationService.prototype.setSelectedEvaluationId = function (id) {
        this.selectedEvaluationId = id;
        console.log('Évaluation ID sélectionnée:', id);
    };
    EvaluationService.prototype.getSelectedEvaluationId = function () {
        return this.selectedEvaluationId;
    };
    EvaluationService.prototype.resetSelectedEvaluationId = function () {
        this.selectedEvaluationId = null;
    };
    EvaluationService.prototype.setViewMode = function (isViewMode) {
        this.viewMode = isViewMode;
        console.log('Mode vue défini:', isViewMode);
    };
    EvaluationService.prototype.getViewMode = function () {
        return this.viewMode;
    };
    EvaluationService.prototype.resetSelection = function () {
        this.selectedCandidatId = null;
        this.selectedEvaluationId = null;
        this.viewMode = false;
        console.log('Sélections réinitialisées');
    };
    // --- CRITERES ---
    EvaluationService.prototype.getCriteres = function () {
        return this.http.get(this.apiUrl + "/api/criteres", {
            headers: this.getAuthHeaders()
        });
    };
    // --- CANDIDAT DETAILS PARTAGE ---
    EvaluationService.prototype.setSelectedCandidatDetails = function (details) {
        this.selectedCandidatDetailsSource.next(details);
        console.log('Détails candidat définis:', details);
    };
    EvaluationService.prototype.getSelectedCandidatDetails = function () {
        return this.selectedCandidatDetailsSource.asObservable();
    };
    // --- OPERATIONS AVANCEES ---
    EvaluationService.prototype.resetEvaluation = function (evaluationId) {
        return this.http.put(this.apiUrl + "/api/evaluations/" + evaluationId + "/reset", null, {
            headers: this.getAuthHeaders()
        });
    };
    // Méthode pour récupérer une évaluation complète avec tous les détails
    EvaluationService.prototype.getEvaluationComplete = function (evaluationId) {
        return this.http.get(this.apiUrl + "/api/evaluations/" + evaluationId + "/complete", {
            headers: this.getAuthHeaders()
        }).pipe(rxjs_1.catchError(function (error) {
            console.error('Erreur lors de la récupération de l\'évaluation complète:', error);
            return rxjs_2.of(null);
        }));
    };
    // Méthode utilitaire pour valider une évaluation
    EvaluationService.prototype.validateEvaluation = function (evaluation) {
        return !!(evaluation && evaluation.id && evaluation.candidatId);
    };
    // Méthode pour formater une date de manière cohérente
    EvaluationService.prototype.formatDateForAPI = function (date) {
        if (!date)
            return null;
        try {
            var dateObj = typeof date === 'string' ? new Date(date) : date;
            return dateObj.toISOString();
        }
        catch (error) {
            console.error('Erreur de formatage de date:', error);
            return null;
        }
    };
    // Méthode pour parser une date reçue de l'API
    EvaluationService.prototype.parseDateFromAPI = function (dateString) {
        if (!dateString)
            return null;
        try {
            return new Date(dateString);
        }
        catch (error) {
            console.error('Erreur de parsing de date:', error);
            return null;
        }
    };
    // --- DEBUG ET UTILITAIRES ---
    EvaluationService.prototype.logCurrentState = function () {
        console.log('État actuel du service:', {
            selectedCandidatId: this.selectedCandidatId,
            selectedEvaluationId: this.selectedEvaluationId,
            viewMode: this.viewMode,
            currentUser: this.getCurrentUser()
        });
    };
    // deleteEvaluation(evaluationId: number): Observable<any> {
    //   return this.http.delete<any>(`${this.apiUrl}/api/evaluations/${evaluationId}`, {
    //     headers: this.getAuthHeaders()
    //   });
    // }
    EvaluationService.prototype.addOrUpdateDecision = function (candidatId, juryId, commentaireFinal) {
        return this.http.post(this.apiUrl + "/api/decisions", // adapte l'URL si besoin
        {
            candidatId: candidatId,
            juryId: juryId,
            commentaireFinal: commentaireFinal
        }, { headers: this.getAuthHeaders() });
    };
    EvaluationService.prototype.emitRefreshList = function () {
        this.refreshListSubject.next();
    };
    EvaluationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EvaluationService);
    return EvaluationService;
}());
exports.EvaluationService = EvaluationService;
