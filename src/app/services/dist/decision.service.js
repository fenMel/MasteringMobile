"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DecisionService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../environments/environment");
var DecisionService = /** @class */ (function () {
    function DecisionService(authService, http) {
        this.authService = authService;
        this.http = http;
        this.apiUrl = environment_1.environment.apiUrl;
    }
    DecisionService.prototype.getAuthHeaders = function () {
        return new http_1.HttpHeaders({
            Authorization: 'Bearer ' + this.authService.getToken()
        });
    };
    // --- CRUD DECISIONS ---
    DecisionService.prototype.getAllDecisions = function () {
        return this.http.get(this.apiUrl + "/api/decisions", {
            headers: this.getAuthHeaders()
        }).pipe(operators_1.catchError(function (error) {
            console.error('Erreur lors de la récupération des décisions:', error);
            return rxjs_1.of([]);
        }));
    };
    DecisionService.prototype.getDecisionsByCandidat = function (candidatId) {
        return this.http.get(this.apiUrl + "/api/decisions/candidat/" + candidatId, {
            headers: this.getAuthHeaders()
        }).pipe(operators_1.catchError(function (error) {
            console.error('Erreur lors de la récupération des décisions du candidat:', error);
            return rxjs_1.of([]);
        }));
    };
    DecisionService.prototype.addDecision = function (data) {
        return this.http.post(this.apiUrl + "/api/decisions", data, {
            headers: this.getAuthHeaders()
        }).pipe(operators_1.catchError(function (error) {
            console.error('Erreur lors de l\'ajout de la décision:', error);
            return rxjs_1.of(null);
        }));
    };
    DecisionService.prototype.updateDecision = function (id, data) {
        return this.http.put(this.apiUrl + "/api/decisions/" + id, data, {
            headers: this.getAuthHeaders()
        }).pipe(operators_1.catchError(function (error) {
            console.error('Erreur lors de la modification de la décision:', error);
            return rxjs_1.of(null);
        }));
    };
    DecisionService.prototype.deleteDecision = function (id) {
        return this.http["delete"](this.apiUrl + "/api/decisions/" + id, {
            headers: this.getAuthHeaders()
        }).pipe(operators_1.catchError(function (error) {
            console.error('Erreur lors de la suppression de la décision:', error);
            return rxjs_1.of(null);
        }));
    };
    DecisionService.prototype.getDecisionById = function (id) {
        return this.http.get(this.apiUrl + "/api/decisions/" + id, {
            headers: this.getAuthHeaders() // doit inclure Authorization si besoin
        }).pipe(operators_1.catchError(function (error) {
            console.error('Erreur lors de la récupération de la décision:', error);
            return rxjs_1.of(null);
        }));
    };
    DecisionService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], DecisionService);
    return DecisionService;
}());
exports.DecisionService = DecisionService;
