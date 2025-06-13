"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CandidatDashboardComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var standalone_1 = require("@ionic/angular/standalone");
var icons_1 = require("ionicons/icons");
var ionicons_1 = require("ionicons");
var candidat_decision_component_1 = require("../candidat-decision/candidat-decision.component");
var CandidatDashboardComponent = /** @class */ (function () {
    function CandidatDashboardComponent(router, menuCtrl) {
        this.router = router;
        this.menuCtrl = menuCtrl;
        // studentName = 'John Doe'; // This would come from your auth service
        // stats = {
        //   applications: 12,
        //   pending: 5,
        //   accepted: 3,
        //   interviews: 2
        // };
        // quickActions = [
        //   {
        //     icon: 'document-text',
        //     title: 'Nouvelle candidature',
        //     subtitle: 'Postuler à un emploi',
        //     color: 'primary',
        //     route: '/dashboard/candidat/nouvelle-candidature'
        //   },
        //   {
        //     icon: 'folder',
        //     title: 'Mes candidatures',
        //     subtitle: 'Voir toutes mes candidatures',
        //     color: 'success',
        //     route: '/dashboard/candidat/mes-candidatures'
        //   },
        //   {
        //     icon: 'person',
        //     title: 'Mon profil',
        //     subtitle: 'Modifier mes informations',
        //     color: 'tertiary',
        //     route: '/dashboard/candidat/profil'
        //   },
        //   {
        //     icon: 'calendar',
        //     title: 'Entretiens',
        //     subtitle: 'Mes rendez-vous',
        //     color: 'warning',
        //     route: '/dashboard/candidat/entretiens'
        //   }
        // ];
        // recentApplications = [
        //   {
        //     company: 'Tech Solutions',
        //     position: 'Développeur Frontend',
        //     status: 'pending',
        //     date: '2024-01-15',
        //     logo: 'business'
        //   },
        //   {
        //     company: 'Digital Agency',
        //     position: 'Designer UX/UI',
        //     status: 'accepted',
        //     date: '2024-01-12',
        //     logo: 'business'
        //   },
        //   {
        //     company: 'StartUp Inc',
        //     position: 'Stage Marketing',
        //     status: 'interview',
        //     date: '2024-01-10',
        //     logo: 'business'
        //   }
        // ];
        this.activeView = 'dashboard';
        // Register all icons
        ionicons_1.addIcons({ person: icons_1.person, folder: icons_1.folder, calendar: icons_1.calendar, notifications: icons_1.notifications, personOutline: icons_1.personOutline, settings: icons_1.settings, logOut: icons_1.logOut, documentText: icons_1.documentText, time: icons_1.time, checkmarkCircle: icons_1.checkmarkCircle, chevronForward: icons_1.chevronForward, arrowForward: icons_1.arrowForward, ribbon: icons_1.ribbon, briefcase: icons_1.briefcase, business: icons_1.business, home: icons_1.home, add: icons_1.add, search: icons_1.search, personCircle: icons_1.personCircle });
    }
    CandidatDashboardComponent.prototype.ngOnInit = function () {
        // Load user data and stats
    };
    CandidatDashboardComponent.prototype.logout = function () {
        localStorage.clear();
        this.router.navigate(['/login']);
    };
    CandidatDashboardComponent.prototype.navigateTo = function (route) {
        this.router.navigate([route]);
    };
    CandidatDashboardComponent.prototype.setActiveView = function (view) {
        this.activeView = view;
    };
    CandidatDashboardComponent.prototype.closeMenu = function () {
        var _this = this;
        this.menuCtrl.close().then(function () {
            // Déplace le focus sur le bouton invisible après fermeture du menu
            setTimeout(function () {
                var _a;
                (_a = _this.mainFocusTrap) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
            }, 100);
        });
    };
    CandidatDashboardComponent.prototype.getStatusColor = function (status) {
        switch (status) {
            case 'pending': return 'warning';
            case 'accepted': return 'success';
            case 'rejected': return 'danger';
            case 'interview': return 'primary';
            default: return 'medium';
        }
    };
    CandidatDashboardComponent.prototype.getStatusText = function (status) {
        switch (status) {
            case 'pending': return 'En attente';
            case 'accepted': return 'Acceptée';
            case 'rejected': return 'Refusée';
            case 'interview': return 'Entretien';
            default: return 'Inconnu';
        }
    };
    __decorate([
        core_1.ViewChild('mainFocusTrap')
    ], CandidatDashboardComponent.prototype, "mainFocusTrap");
    CandidatDashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-candidat-dashboard',
            templateUrl: './candidat-dashboard.component.html',
            styleUrls: ['./candidat-dashboard.component.scss'],
            standalone: true,
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                common_1.DatePipe,
                standalone_1.IonApp,
                standalone_1.IonMenu,
                standalone_1.IonHeader,
                standalone_1.IonToolbar,
                standalone_1.IonTitle,
                standalone_1.IonContent,
                standalone_1.IonIcon,
                standalone_1.IonList,
                standalone_1.IonItem,
                standalone_1.IonLabel,
                standalone_1.IonButton,
                standalone_1.IonButtons,
                standalone_1.IonMenuButton,
                standalone_1.IonBadge,
                standalone_1.IonChip,
                standalone_1.IonCard,
                standalone_1.IonCardHeader,
                standalone_1.IonCardContent,
                standalone_1.IonCardTitle,
                standalone_1.IonCardSubtitle,
                candidat_decision_component_1.CandidatDecisionComponent
            ]
        })
    ], CandidatDashboardComponent);
    return CandidatDashboardComponent;
}());
exports.CandidatDashboardComponent = CandidatDashboardComponent;
