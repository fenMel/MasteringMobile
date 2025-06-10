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
    path: 'ajouter-evaluation/:id',
    loadComponent: () => import('./components/ajouter-evaluation/ajouter-evaluation.component').then(m => m.AjouterEvaluationComponent),
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
