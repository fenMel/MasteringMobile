import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCheckbox,
  IonContent,
  IonGrid, IonRow, IonCol,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem, IonItemOption, IonItemOptions, IonItemSliding,
  IonLabel,
  IonList,
  IonMenu, IonMenuButton,
  IonModal,
  IonProgressBar,
  IonSearchbar,
  IonSelect, IonSelectOption,
  IonSplitPane,
  IonTitle,
  IonToast,
  IonToolbar, IonAlert, IonApp, IonSpinner, IonDatetime
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {ModalController, ToastController, AlertController, MenuController} from '@ionic/angular';
import {
  personOutline,
  schoolOutline,
  settingsOutline,
  listOutline,
  addOutline,
  exitOutline,
  trashOutline,
  saveOutline,
  homeOutline,
  person,
  folder,
  calendar,
  notifications,
  settings,
  logOut,
  documentText,
  time,
  checkmarkCircle,
  briefcase,
  business,
  chevronForward,
  arrowForward,
  home,
  add,
  search,
  personCircle, logOutOutline, peopleOutline, mailOutline, callOutline, cameraOutline, createOutline, calendarOutline, personCircleOutline, notificationsOutline, cloudUploadOutline, closeSharp, closeOutline,
  chevronBackOutline, chevronForwardOutline, arrowBack, archive, clipboardOutline, documentTextOutline, archiveOutline } from 'ionicons/icons';

import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import {RouterLinkActive, RouterOutlet} from "@angular/router";
import {Coordinator, Student} from "../../models/students";
import {DataService} from "../../services/data.service";
import { EvaluationComponent } from '../evaluation/evaluation.component';
import { EvaluationStateService } from 'src/app/services/evaluation-state.service';
import { GestionEvaluationComponent } from '../gestion-evaluation/gestion-evaluation.component';
import { DecisionComponent } from "../decision/decision.component";
import { VoirDecisionComponent } from "../voir-decision/voir-decision.component"; // <-- AJOUT

import { Decision } from '../decision/decision.model'; 
import { ArchiveDecisionComponent } from '../archive-decision/archive-decision.component';

@Component({
  selector: 'app-coordinator-dashboard',
  templateUrl: './coordinator-dashboard.component.html',
  styleUrls: ['./coordinator-dashboard.component.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonBadge,
    IonButton,
    IonButtons,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonCheckbox,
    IonContent,
    IonGrid, IonRow, IonCol,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem, IonItemOption, IonItemOptions,
    IonLabel,
    IonList,
    IonMenu, IonMenuButton,
    IonModal,
    IonProgressBar,
    IonSearchbar,
    IonSelect, IonSelectOption,
    IonSplitPane,
    IonTitle,
    IonToast,
    GestionEvaluationComponent,
    DecisionComponent,
    VoirDecisionComponent, 
    ArchiveDecisionComponent,
    IonToolbar, NgIf, FormsModule, TitleCasePipe, IonAlert, IonAlert, IonApp, IonItemSliding, NgForOf, IonSpinner, IonDatetime
  ],
  providers: [
    ModalController,
    ToastController,
    AlertController
  ]
})

export class CoordinatorDashboardComponent implements OnInit {
  private menuController = inject(MenuController);

  // Theme Management
  isDarkMode = false;
  today = new Date();
  formattedDate = this.today.toISOString().split('T')[0];

  private searchSubject = new Subject<string>();

  // Active View Management
  activeView = 'home';
  views = {
    home: 'Dashboard',
    profile: 'Profile',
    students: 'Students',
    params: 'Parameters'
  };

  // Coordinator Data
  coordinator = {
    name: 'Dr. Sarah Johnson',
    email: 's.johnson@university.edu',
    department: 'Computer Science',
    phone: '+1 (555) 123-4567',
    avatar: 'assets/images/coordinator-avatar.png'
  };

  // Student Data
  students = [
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
  filteredStudents = [...this.students];
  searchQuery = '';

  // Modal States
  isStudentDetailsModalOpen = false;
  isStudentFormModalOpen = false;
  selectedStudent: any = null;
  formStudent: any = {};
  isEditingStudent = false;

  // Alert States
  showDeleteAlert = false;
  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'Delete',
      role: 'confirm',
      handler: () => {
        this.deleteStudent();
      }
    }
  ];


  highlightedDates = [
    {
      date: '2025-06-05',
      textColor: '#800080',
      backgroundColor: '#ffc0cb',
    },
    {
      date: '2025-06-10',
      textColor: '#09721b',
      backgroundColor: '#c8e5d0',
    },
    {
      date: '2025-06-20',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: 'var(--ion-color-secondary)',
    },
    {
      date: '2025-06-23',
      textColor: 'rgb(68, 10, 184)',
      backgroundColor: 'rgb(211, 200, 229)',
    },
  ];

  studentToDelete: number | null = null;

  // Toast States
  showToast = false;
  toastMessage = '';
  toastColor = 'success';

  public datetime!: string;

  // Dans le parent (ex: dashboard ou page principale)
  menuActif = 'liste'; // ou 'voir-decision'
  decisionSelectionnee: Decision | null = null; // <-- AJOUT

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private evaluationState: EvaluationStateService,
    private router: Router
  ) {
    addIcons({homeOutline,personOutline,peopleOutline,settingsOutline,logOutOutline,mailOutline,callOutline,cameraOutline,saveOutline,addOutline,createOutline,trashOutline,calendarOutline,personCircleOutline,notificationsOutline,cloudUploadOutline,closeSharp,closeOutline,person,folder,calendar,notifications,settings,logOut,documentText,time,checkmarkCircle,briefcase,business,chevronForward,arrowForward,home,add,search,personCircle});
    addIcons({
      'chevron-back-outline': chevronBackOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'arrow-back': arrowBack
    });
  }

  ngOnInit() {
    this.checkThemePreference();
    this.setSousMenu('liste');
  }

  // Theme Management
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme', this.isDarkMode);
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  checkThemePreference() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedMode = localStorage.getItem('darkMode');

    if (savedMode !== null) {
      this.isDarkMode = savedMode === 'true';
    } else {
      this.isDarkMode = prefersDark.matches;
    }

    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }

  // View Management
  setActiveView(view: string) {
    this.activeView = view;
  }

  getActiveViewTitle() {
    return this.views[this.activeView as keyof typeof this.views] || 'Dashboard';
  }

  // Student Management
  filterStudents() {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      this.filteredStudents = [...this.students];
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();

    this.filteredStudents = this.students.filter(student =>
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.course.toLowerCase().includes(query) ||
      student.year.toString().includes(query) ||
      student.status.toLowerCase().includes(query)
    );
  }

  // Modal Functions
  async presentStudentDetailsModal(student: any) {
    this.selectedStudent = student;
    this.isStudentDetailsModalOpen = true;
  }

  closeStudentDetailsModal() {
    this.isStudentDetailsModalOpen = false;
    this.selectedStudent = null;
  }

  async presentAddStudentModal() {
    this.isEditingStudent = false;
    this.formStudent = {
      name: '',
      email: '',
      course: '',
      year: '1',
      status: 'active'
    };
    this.isStudentFormModalOpen = true;
  }

  async presentEditStudentModal(student: any) {
    this.isEditingStudent = true;
    this.formStudent = { ...student };
    this.isStudentFormModalOpen = true;
  }

  closeStudentFormModal() {
    this.isStudentFormModalOpen = false;
    this.formStudent = {};
  }

  changeStudentAvatar() {
    // In a real app, this would open the device camera/gallery
    this.showToastMessage('Feature coming soon!', 'warning');
  }

  // Student CRUD Operations
  saveStudent() {
    if (this.isEditingStudent) {
      // Update existing student
      const index = this.students.findIndex(s => s.id === this.formStudent.id);
      if (index !== -1) {
        this.students[index] = { ...this.formStudent };
      }
      this.showToastMessage('Student updated successfully!');
    } else {
      // Add new student
      const newId = Math.max(...this.students.map(s => s.id), 0) + 1;
      this.students.push({
        id: newId,
        ...this.formStudent
      });
      this.showToastMessage('Student added successfully!');
    }

    this.filterStudents();
    this.closeStudentFormModal();
  }

  confirmDelete(studentId: number) {
    this.studentToDelete = studentId;
    this.showDeleteAlert = true;
  }

  deleteStudent() {
    if (this.studentToDelete) {
      this.students = this.students.filter(s => s.id !== this.studentToDelete);
      this.filterStudents();
      this.showToastMessage('Student deleted successfully!');
    }
    this.studentToDelete = null;
  }

  // Profile Management
  saveProfile() {
    this.showToastMessage('Profile saved successfully!');
  }

  changeAvatar() {
    // In a real app, this would open the device camera/gallery
    this.showToastMessage('Feature coming soon!', 'warning');
  }

  getActiveStudentsCount() {
    return this.students.filter(s => s.status === 'active').length;
  }

  getTotalStudentsCount(): number {
    return this.students.length;
  }

  // UI Helpers
  async showToastMessage(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    this.toastMessage = message;
    this.toastColor = color;
    this.showToast = true;

    // Auto-hide after 3 seconds
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  // Authentication
  logout() {
    // In a real app, this would navigate to login page
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // Dans le parent (ex: dashboard ou page principale)
  setSousMenu = (menu: string, decision?: Decision) => {
    this.menuActif = menu;
    if (decision) {
      this.decisionSelectionnee = decision;
    }
  };

  // Méthode pour ouvrir le modal
  async openVoirDecision(decision: any) {
    const modal = await this.modalCtrl.create({
      component: VoirDecisionComponent,
      componentProps: {
        evaluationResults: [decision],
        setSousMenu: () => modal.dismiss()
      },
      breakpoints: [0, 0.7, 1],
      initialBreakpoint: 0.7
    });
    await modal.present();
  }
}
