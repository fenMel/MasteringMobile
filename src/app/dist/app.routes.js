"use strict";
exports.__esModule = true;
exports.routes = void 0;
var AuthGuard_1 = require("./guards/AuthGuard");
// import { RoleGuard } from './guards/role.guard';
// import { NoAuthGuard } from "./guards/NoAuthGuard";
// @ts-ignore
exports.routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./components/login/login.component'); }).then(function (m) { return m.LoginComponent; }); }
    },
    {
        path: 'dashboard',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./components/dashboard/dashboard.component'); }).then(function (m) { return m.DashboardComponent; }); },
        canActivate: [AuthGuard_1.AuthGuard],
        pathMatch: "full"
    },
    {
        path: 'welcome',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./components/welcome/welcome.component'); }).then(function (m) { return m.WelcomeComponent; }); },
        canActivate: [AuthGuard_1.AuthGuard],
        pathMatch: "full"
    },
    {
        path: 'parameters',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./components/parameters/parameters.component'); }).then(function (m) { return m.ParametersComponent; }); },
        canActivate: [AuthGuard_1.AuthGuard]
    },
    {
        path: 'profile',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./components/profile/profile.component'); }).then(function (m) { return m.ProfileComponent; }); },
        canActivate: [AuthGuard_1.AuthGuard]
    },
    {
        path: 'coordinator-dashboard',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./components/coordinator-dashboard/coordinator-dashboard.component'); }).then(function (m) { return m.CoordinatorDashboardComponent; }); },
        canActivate: [AuthGuard_1.AuthGuard],
        pathMatch: "full",
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'profile', loadComponent: function () { return Promise.resolve().then(function () { return require('./components/profile/profile.component'); }).then(function (m) { return m.ProfileComponent; }); } },
            { path: 'parametres', loadComponent: function () { return Promise.resolve().then(function () { return require('./components/parameters/parameters.component'); }).then(function (m) { return m.ParametersComponent; }); } },
        ]
    },
    {
        path: 'candidat-dashboard',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./components/candidat-dashboard/candidat-dashboard.component'); }).then(function (m) { return m.CandidatDashboardComponent; }); },
        canActivate: [AuthGuard_1.AuthGuard]
    },
    {
        path: 'jury-dashboard',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./components/jury-dashboard/jury-dashboard.component'); }).then(function (m) { return m.JuryDashboardComponent; }); },
        canActivate: [AuthGuard_1.AuthGuard]
    },
    {
        path: 'ajouter-evaluation',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./components/ajouter-evaluation/ajouter-evaluation.component'); }).then(function (m) { return m.AjouterEvaluationComponent; }); },
        canActivate: [AuthGuard_1.AuthGuard]
    },
    {
        path: 'ajouter-evaluation/:id',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./components/ajouter-evaluation/ajouter-evaluation.component'); }).then(function (m) { return m.AjouterEvaluationComponent; }); },
        canActivate: [AuthGuard_1.AuthGuard]
    },
    {
        path: 'gestion-evaluation/:id',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./components/gestion-evaluation/gestion-evaluation.component'); }).then(function (m) { return m.GestionEvaluationComponent; }); },
        canActivate: [AuthGuard_1.AuthGuard]
    },
    {
        path: 'decision/:id',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./components/decision/decision.component'); }).then(function (m) { return m.DecisionComponent; }); },
        canActivate: [AuthGuard_1.AuthGuard]
    },
    {
        path: 'unauthorized',
        loadComponent: function () { return Promise.resolve().then(function () { return require('./components/unauthorized/unauthorized.component'); }).then(function (m) { return m.UnauthorizedComponent; }); }
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
