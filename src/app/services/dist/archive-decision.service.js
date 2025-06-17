"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ArchiveDecisionService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../environments/environment");
var ArchiveDecisionService = /** @class */ (function () {
    function ArchiveDecisionService(authService, http) {
        this.authService = authService;
        this.http = http;
        this.apiUrl = environment_1.environment.apiUrl;
    }
    /**
     * Génère les en-têtes HTTP avec le token d'authentification.
     */
    ArchiveDecisionService.prototype.getAuthHeaders = function () {
        return new http_1.HttpHeaders({
            Authorization: 'Bearer ' + this.authService.getToken()
        });
    };
    /**
     * Récupère toutes les décisions archivées depuis l'API.
     */
    ArchiveDecisionService.prototype.getAll = function () {
        return this.http.get(this.apiUrl + "/api/archive-decisions", {
            headers: this.getAuthHeaders()
        }).pipe(operators_1.catchError(function (error) {
            console.error('Erreur lors de la récupération des archives:', error);
            return rxjs_1.of([]);
        }));
    };
    /**
     * Archive une décision via l'API.
     */
    ArchiveDecisionService.prototype.archive = function (decision) {
        return this.http.post(this.apiUrl + "/api/archive-decisions", decision, {
            headers: this.getAuthHeaders()
        }).pipe(operators_1.catchError(function (error) {
            console.error('Erreur lors de l\'archivage de la décision:', error);
            return rxjs_1.of(null);
        }));
    };
    ArchiveDecisionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ArchiveDecisionService);
    return ArchiveDecisionService;
}());
exports.ArchiveDecisionService = ArchiveDecisionService;
