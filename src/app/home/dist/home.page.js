"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomePage = void 0;
var core_1 = require("@angular/core");
var standalone_1 = require("@ionic/angular/standalone");
var evaluation_component_1 = require("../components/evaluation/evaluation.component"); // <-- Ajoute cette ligne
var HomePage = /** @class */ (function () {
    function HomePage() {
    }
    HomePage = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
            imports: [
                standalone_1.IonHeader,
                standalone_1.IonToolbar,
                standalone_1.IonTitle,
                standalone_1.IonContent,
                evaluation_component_1.EvaluationComponent // <-- Ajoute ce composant ici
            ]
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
