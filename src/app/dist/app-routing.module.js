"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var voir_decision_component_1 = require("./components/voir-decision/voir-decision.component");
var candidat_decision_component_1 = require("./components/candidat-decision/candidat-decision.component");
var routes = [
    {
        path: 'home',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./home/home.module'); }).then(function (m) { return m.HomePageModule; }); }
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    { path: 'dashboard/candidat/mes-resultats', component: candidat_decision_component_1.CandidatDecisionComponent },
    {
        path: 'welcome',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/welcome/welcome.module'); }).then(function (m) { return m.WelcomePageModule; }); }
    },
    { path: 'voir-decision/:id', component: voir_decision_component_1.VoirDecisionComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes, { preloadingStrategy: router_1.PreloadAllModules })
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
