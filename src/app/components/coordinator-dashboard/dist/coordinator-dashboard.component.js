"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.CoordinatorDashboardComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var standalone_1 = require("@ionic/angular/standalone");
var ionicons_1 = require("ionicons");
var angular_1 = require("@ionic/angular");
var icons_1 = require("ionicons/icons");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var gestion_evaluation_component_1 = require("../gestion-evaluation/gestion-evaluation.component");
var decision_component_1 = require("../decision/decision.component");
var CoordinatorDashboardComponent = /** @class */ (function () {
    function CoordinatorDashboardComponent(modalCtrl, alertCtrl, toastCtrl, evaluationState, router) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.evaluationState = evaluationState;
        this.router = router;
        this.menuController = core_1.inject(angular_1.MenuController);
        // Theme Management
        this.isDarkMode = false;
        this.today = new Date();
        this.formattedDate = this.today.toISOString().split('T')[0];
        this.searchSubject = new rxjs_1.Subject();
        // Active View Management
        this.activeView = 'home';
        this.views = {
            home: 'Dashboard',
            profile: 'Profile',
            students: 'Students',
            params: 'Parameters'
        };
        // Coordinator Data
        this.coordinator = {
            name: 'Dr. Sarah Johnson',
            email: 's.johnson@university.edu',
            department: 'Computer Science',
            phone: '+1 (555) 123-4567',
            avatar: 'assets/images/coordinator-avatar.png'
        };
        // Student Data
        this.students = [
            {
                id: 1,
                name: 'Michael Chen',
                email: 'michael.chen@student.edu',
                course: 'Computer Science',
                year: '3',
                status: 'active',
                avatar: 'assets/images/student1-avatar.png'
            },
            {
                id: 2,
                name: 'Jessica Williams',
                email: 'jessica.w@student.edu',
                course: 'Data Science',
                year: '2',
                status: 'active'
            },
            {
                id: 3,
                name: 'David Kim',
                email: 'd.kim@student.edu',
                course: 'Artificial Intelligence',
                year: '4',
                status: 'inactive'
            }
        ];
        this.filteredStudents = __spreadArrays(this.students);
        this.searchQuery = '';
        // Modal States
        this.isStudentDetailsModalOpen = false;
        this.isStudentFormModalOpen = false;
        this.selectedStudent = null;
        this.formStudent = {};
        this.isEditingStudent = false;
        // Alert States
        this.showDeleteAlert = false;
        this.alertButtons = [
            {
                text: 'Cancel',
                role: 'cancel'
            },
            {
                text: 'Delete',
                role: 'confirm',
                handler: function () {
                    _this.deleteStudent();
                }
            }
        ];
        this.highlightedDates = [
            {
                date: '2025-06-05',
                textColor: '#800080',
                backgroundColor: '#ffc0cb'
            },
            {
                date: '2025-06-10',
                textColor: '#09721b',
                backgroundColor: '#c8e5d0'
            },
            {
                date: '2025-06-20',
                textColor: 'var(--ion-color-secondary-contrast)',
                backgroundColor: 'var(--ion-color-secondary)'
            },
            {
                date: '2025-06-23',
                textColor: 'rgb(68, 10, 184)',
                backgroundColor: 'rgb(211, 200, 229)'
            },
        ];
        this.studentToDelete = null;
        // Toast States
        this.showToast = false;
        this.toastMessage = '';
        this.toastColor = 'success';
        ionicons_1.addIcons({ homeOutline: icons_1.homeOutline, personOutline: icons_1.personOutline, peopleOutline: icons_1.peopleOutline, settingsOutline: icons_1.settingsOutline, logOutOutline: icons_1.logOutOutline, mailOutline: icons_1.mailOutline, callOutline: icons_1.callOutline, cameraOutline: icons_1.cameraOutline, saveOutline: icons_1.saveOutline, addOutline: icons_1.addOutline, createOutline: icons_1.createOutline, trashOutline: icons_1.trashOutline, calendarOutline: icons_1.calendarOutline, personCircleOutline: icons_1.personCircleOutline, notificationsOutline: icons_1.notificationsOutline, cloudUploadOutline: icons_1.cloudUploadOutline, closeSharp: icons_1.closeSharp, closeOutline: icons_1.closeOutline, person: icons_1.person, folder: icons_1.folder, calendar: icons_1.calendar, notifications: icons_1.notifications, settings: icons_1.settings, logOut: icons_1.logOut, documentText: icons_1.documentText, time: icons_1.time, checkmarkCircle: icons_1.checkmarkCircle, briefcase: icons_1.briefcase, business: icons_1.business, chevronForward: icons_1.chevronForward, arrowForward: icons_1.arrowForward, home: icons_1.home, add: icons_1.add, search: icons_1.search, personCircle: icons_1.personCircle });
    }
    CoordinatorDashboardComponent.prototype.ngOnInit = function () {
        this.checkThemePreference();
    };
    // Theme Management
    CoordinatorDashboardComponent.prototype.toggleTheme = function () {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('dark-theme', this.isDarkMode);
        localStorage.setItem('darkMode', this.isDarkMode.toString());
    };
    CoordinatorDashboardComponent.prototype.checkThemePreference = function () {
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        var savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            this.isDarkMode = savedMode === 'true';
        }
        else {
            this.isDarkMode = prefersDark.matches;
        }
        document.body.classList.toggle('dark-theme', this.isDarkMode);
    };
    // View Management
    CoordinatorDashboardComponent.prototype.setActiveView = function (view) {
        this.activeView = view;
    };
    CoordinatorDashboardComponent.prototype.getActiveViewTitle = function () {
        return this.views[this.activeView] || 'Dashboard';
    };
    // Student Management
    CoordinatorDashboardComponent.prototype.filterStudents = function () {
        if (!this.searchQuery || this.searchQuery.trim() === '') {
            this.filteredStudents = __spreadArrays(this.students);
            return;
        }
        var query = this.searchQuery.toLowerCase().trim();
        this.filteredStudents = this.students.filter(function (student) {
            return student.name.toLowerCase().includes(query) ||
                student.email.toLowerCase().includes(query) ||
                student.course.toLowerCase().includes(query) ||
                student.year.toString().includes(query) ||
                student.status.toLowerCase().includes(query);
        });
    };
    // Modal Functions
    CoordinatorDashboardComponent.prototype.presentStudentDetailsModal = function (student) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.selectedStudent = student;
                this.isStudentDetailsModalOpen = true;
                return [2 /*return*/];
            });
        });
    };
    CoordinatorDashboardComponent.prototype.closeStudentDetailsModal = function () {
        this.isStudentDetailsModalOpen = false;
        this.selectedStudent = null;
    };
    CoordinatorDashboardComponent.prototype.presentAddStudentModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.isEditingStudent = false;
                this.formStudent = {
                    name: '',
                    email: '',
                    course: '',
                    year: '1',
                    status: 'active'
                };
                this.isStudentFormModalOpen = true;
                return [2 /*return*/];
            });
        });
    };
    CoordinatorDashboardComponent.prototype.presentEditStudentModal = function (student) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.isEditingStudent = true;
                this.formStudent = __assign({}, student);
                this.isStudentFormModalOpen = true;
                return [2 /*return*/];
            });
        });
    };
    CoordinatorDashboardComponent.prototype.closeStudentFormModal = function () {
        this.isStudentFormModalOpen = false;
        this.formStudent = {};
    };
    CoordinatorDashboardComponent.prototype.changeStudentAvatar = function () {
        // In a real app, this would open the device camera/gallery
        this.showToastMessage('Feature coming soon!', 'warning');
    };
    // Student CRUD Operations
    CoordinatorDashboardComponent.prototype.saveStudent = function () {
        var _this = this;
        if (this.isEditingStudent) {
            // Update existing student
            var index = this.students.findIndex(function (s) { return s.id === _this.formStudent.id; });
            if (index !== -1) {
                this.students[index] = __assign({}, this.formStudent);
            }
            this.showToastMessage('Student updated successfully!');
        }
        else {
            // Add new student
            var newId = Math.max.apply(Math, __spreadArrays(this.students.map(function (s) { return s.id; }), [0])) + 1;
            this.students.push(__assign({ id: newId }, this.formStudent));
            this.showToastMessage('Student added successfully!');
        }
        this.filterStudents();
        this.closeStudentFormModal();
    };
    CoordinatorDashboardComponent.prototype.confirmDelete = function (studentId) {
        this.studentToDelete = studentId;
        this.showDeleteAlert = true;
    };
    CoordinatorDashboardComponent.prototype.deleteStudent = function () {
        var _this = this;
        if (this.studentToDelete) {
            this.students = this.students.filter(function (s) { return s.id !== _this.studentToDelete; });
            this.filterStudents();
            this.showToastMessage('Student deleted successfully!');
        }
        this.studentToDelete = null;
    };
    // Profile Management
    CoordinatorDashboardComponent.prototype.saveProfile = function () {
        this.showToastMessage('Profile saved successfully!');
    };
    CoordinatorDashboardComponent.prototype.changeAvatar = function () {
        // In a real app, this would open the device camera/gallery
        this.showToastMessage('Feature coming soon!', 'warning');
    };
    // Helper Functions
    CoordinatorDashboardComponent.prototype.getTotalStudentsCount = function () {
        return this.students.length;
    };
    CoordinatorDashboardComponent.prototype.getActiveStudentsCount = function () {
        return this.students.filter(function (s) { return s.status === 'active'; }).length;
    };
    // UI Helpers
    CoordinatorDashboardComponent.prototype.showToastMessage = function (message, color) {
        if (color === void 0) { color = 'success'; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.toastMessage = message;
                this.toastColor = color;
                this.showToast = true;
                // Auto-hide after 3 seconds
                setTimeout(function () {
                    _this.showToast = false;
                }, 3000);
                return [2 /*return*/];
            });
        });
    };
    // Authentication
    CoordinatorDashboardComponent.prototype.logout = function () {
        // In a real app, this would navigate to login page
        localStorage.clear();
        this.router.navigate(['/login']);
    };
    CoordinatorDashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-coordinator-dashboard',
            templateUrl: './coordinator-dashboard.component.html',
            styleUrls: ['./coordinator-dashboard.component.scss'],
            standalone: true,
            imports: [
                standalone_1.IonAvatar,
                standalone_1.IonBadge,
                standalone_1.IonButton,
                standalone_1.IonButtons,
                standalone_1.IonCard, standalone_1.IonCardContent, standalone_1.IonCardHeader, standalone_1.IonCardSubtitle, standalone_1.IonCardTitle,
                standalone_1.IonCheckbox,
                standalone_1.IonContent,
                standalone_1.IonGrid, standalone_1.IonRow, standalone_1.IonCol,
                standalone_1.IonHeader,
                standalone_1.IonIcon,
                standalone_1.IonInput,
                standalone_1.IonItem, standalone_1.IonItemOption, standalone_1.IonItemOptions,
                standalone_1.IonLabel,
                standalone_1.IonList,
                standalone_1.IonMenu, standalone_1.IonMenuButton,
                standalone_1.IonModal,
                standalone_1.IonProgressBar,
                standalone_1.IonSearchbar,
                standalone_1.IonSelect, standalone_1.IonSelectOption,
                standalone_1.IonSplitPane,
                standalone_1.IonTitle,
                standalone_1.IonToast,
                gestion_evaluation_component_1.GestionEvaluationComponent,
                decision_component_1.DecisionComponent,
                standalone_1.IonToolbar, common_1.NgIf, forms_1.FormsModule, common_1.TitleCasePipe, standalone_1.IonAlert, standalone_1.IonAlert, standalone_1.IonApp, standalone_1.IonItemSliding, common_1.NgForOf, standalone_1.IonSpinner, standalone_1.IonDatetime
            ],
            providers: [
                angular_1.ModalController,
                angular_1.ToastController,
                angular_1.AlertController
            ]
        })
    ], CoordinatorDashboardComponent);
    return CoordinatorDashboardComponent;
}());
exports.CoordinatorDashboardComponent = CoordinatorDashboardComponent;
