"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ArchiveDecisionComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var angular_1 = require("@ionic/angular"); // Import IonicModule pour mobile
var ArchiveDecisionComponent = /** @class */ (function () {
    function ArchiveDecisionComponent(archiveService) {
        this.archiveService = archiveService;
        this.archives = [];
        this.sousMenu = 'liste';
    }
    ArchiveDecisionComponent.prototype.ngOnInit = function () {
        this.loadArchives();
    };
    /**
     * Charge toutes les décisions archivées
     */
    ArchiveDecisionComponent.prototype.loadArchives = function () {
        var _this = this;
        this.archiveService.getAll().subscribe({
            next: function (data) {
                _this.archives = data;
                // Pour mobile, tu peux notifier l'utilisateur ici si besoin
            },
            error: function (error) {
                // Pour mobile, tu peux afficher un toast ou une alerte
                console.error('Erreur lors du chargement des archives:', error);
            }
        });
    };
    /**
     * Définit le sous-menu actif
     */
    ArchiveDecisionComponent.prototype.setSousMenu = function (nom) {
        this.sousMenu = nom;
    };
    ArchiveDecisionComponent = __decorate([
        core_1.Component({
            selector: 'app-archive-decision',
            templateUrl: './archive-decision.component.html',
            styleUrls: ['./archive-decision.component.scss'],
            standalone: true,
            imports: [
                common_1.CommonModule,
                angular_1.IonicModule // Ajoute IonicModule pour utiliser les composants Ionic dans le template
            ]
        })
    ], ArchiveDecisionComponent);
    return ArchiveDecisionComponent;
}());
exports.ArchiveDecisionComponent = ArchiveDecisionComponent;
