import { Routes } from '@angular/router';
import { AuthGuard } from "./guards/AuthGuard";
// import { RoleGuard } from './guards/role.guard';
// import { NoAuthGuard } from "./guards/NoAuthGuard";

// @ts-ignore
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
    // canActivate: [NoAuthGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard],
    pathMatch: "full"
  },
  {
    path: 'welcome',
    loadComponent: () => import('./components/welcome/welcome.component').then(m => m.WelcomeComponent),
    canActivate: [AuthGuard],
    pathMatch: "full"
  },
  {
    path: 'parameters',
    loadComponent: () => import('./components/parameters/parameters.component').then(m => m.ParametersComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'coordinator-dashboard',
    loadComponent: () => import('./components/coordinator-dashboard/coordinator-dashboard.component').then(m => m.CoordinatorDashboardComponent),
    canActivate: [AuthGuard],
    pathMatch: "full",
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'profile', loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent) },
      { path: 'parametres', loadComponent: () => import('./components/parameters/parameters.component').then(m => m.ParametersComponent) },
    ]
  },
  {
    path: 'candidat-dashboard',
    loadComponent: () => import('./components/candidat-dashboard/candidat-dashboard.component').then(m => m.CandidatDashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'jury-dashboard',
    loadComponent: () => import('./components/jury-dashboard/jury-dashboard.component').then(m => m.JuryDashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'ajouter-evaluation',
    loadComponent: () => import('./components/ajouter-evaluation/ajouter-evaluation.component').then(m => m.AjouterEvaluationComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'ajouter-evaluation/:id',
    loadComponent: () => import('./components/ajouter-evaluation/ajouter-evaluation.component').then(m => m.AjouterEvaluationComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'gestion-evaluation/:id',
    loadComponent: () => import('./components/gestion-evaluation/gestion-evaluation.component').then(m => m.GestionEvaluationComponent),
    canActivate: [AuthGuard]
  },
    {
    path: 'decision/:id',
    loadComponent: () => import('./components/decision/decision.component').then(m => m.DecisionComponent),
    canActivate: [AuthGuard]
  },
     {
    path: 'voir-decision/:id',
    loadComponent: () => import('./components/voir-decision/voir-decision.component').then(m => m.VoirDecisionComponent),
    canActivate: [AuthGuard]
  },
       {
    path: 'candidat-decision/:id',
    loadComponent: () => import('./components/candidat-decision/candidat-decision.component').then(m => m.CandidatDecisionComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./components/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
