"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JuryDashboardComponent = void 0;
var core_1 = require("@angular/core");
var standalone_1 = require("@ionic/angular/standalone");
var evaluation_component_1 = require("../evaluation/evaluation.component");
var JuryDashboardComponent = /** @class */ (function () {
    function JuryDashboardComponent(evaluationState) {
        this.evaluationState = evaluationState;
        this.juryName = 'Nom Jury'; // À remplacer par la vraie donnée si besoin
    }
    JuryDashboardComponent.prototype.logout = function () {
        this.evaluationState.resetEvaluations = true;
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/login';
    };
    __decorate([
        core_1.ViewChild(standalone_1.IonMenu)
    ], JuryDashboardComponent.prototype, "menu");
    JuryDashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-jury-dashboard',
            templateUrl: './jury-dashboard.component.html',
            styleUrls: ['./jury-dashboard.component.scss'],
            standalone: true,
            imports: [
                standalone_1.IonMenu,
                standalone_1.IonHeader,
                standalone_1.IonToolbar,
                standalone_1.IonTitle,
                standalone_1.IonContent,
                standalone_1.IonButtons,
                standalone_1.IonMenuButton,
                standalone_1.IonItem,
                standalone_1.IonIcon,
                standalone_1.IonLabel,
                standalone_1.IonApp,
                standalone_1.IonBadge,
                standalone_1.IonButton,
                standalone_1.IonList,
                standalone_1.IonAvatar,
                standalone_1.IonSplitPane,
                evaluation_component_1.EvaluationComponent
            ]
        })
    ], JuryDashboardComponent);
    return JuryDashboardComponent;
}());
exports.JuryDashboardComponent = JuryDashboardComponent;
