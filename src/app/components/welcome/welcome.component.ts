import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AnimationController} from "@ionic/angular";
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonSpinner,
  AlertController,
  ToastController,
  IonIcon
} from '@ionic/angular/standalone';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone:true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonSpinner,
    IonIcon,
    IonSpinner
  ]
})
export class WelcomeComponent  implements OnInit {

  showWelcomeText = false;
  showSubText = false;
  showButton = false;
  showConfetti = false;
  role : any | String


  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.startGraduationSequence();
  }

  ionViewDidEnter() {
    this.playGraduationAnimation();
  }

  private async startGraduationSequence() {
    // Wait for mortarboard animation to complete
    await this.delay(1200);

    // Start confetti
    this.showConfetti = true;

    // Show congratulations text
    await this.delay(500);
    this.showWelcomeText = true;

    // Show subtitle
    await this.delay(800);
    this.showSubText = true;

    // Show continue button
    await this.delay(1000);
    this.showButton = true;

    // Auto-navigate after 5 seconds if user doesn't click
    setTimeout(() => {
      if (!this.hasNavigated) {
        this.navigateToDashboard();
      }
    }, 8000);
  }

  private hasNavigated = false;

  private playGraduationAnimation() {
    const logoElement = document.querySelector('.cap-svg');
    const backgroundElement = document.querySelector('.animated-background');

    if (logoElement) {
      // MASTERING logo entrance animation
      const logoAnimation = this.animationCtrl
        .create()
        .addElement(logoElement)
        .duration(1500)
        .easing('cubic-bezier(0.4, 0.0, 0.2, 1)')
        .keyframes([
          { offset: 0, transform: 'scale(0.3) rotate(-180deg)', opacity: '0' },
          { offset: 0.4, transform: 'scale(1.1) rotate(0deg)', opacity: '1' },
          { offset: 0.7, transform: 'scale(0.95) rotate(5deg)', opacity: '1' },
          { offset: 1, transform: 'scale(1) rotate(0deg)', opacity: '1' }
        ]);

      logoAnimation.play();
    }

    if (backgroundElement) {
      // Background entrance animation
      const bgAnimation = this.animationCtrl
        .create()
        .addElement(backgroundElement)
        .duration(2000)
        .easing('ease-out')
        .fromTo('opacity', '0.6', '1')
        .fromTo('transform', 'scale(1.1)', 'scale(1)');

      bgAnimation.play();
    }
  }

  async navigateToDashboard() {
    if (this.hasNavigated) return;
    this.hasNavigated = true;

    // Modern exit animation - logo scales up and fades
    const logoElement = document.querySelector('.cap-svg');
    const pageElement = document.querySelector('.graduation-container');

    if (logoElement) {
      const exitLogoAnimation = this.animationCtrl
        .create()
        .addElement(logoElement)
        .duration(600)
        .easing('ease-in')
        .fromTo('transform', 'scale(1) rotate(0deg)', 'scale(1.3) rotate(15deg)')
        .fromTo('opacity', '1', '0');

      await exitLogoAnimation.play();
    }

    // Page fade out with modern scaling
    if (pageElement) {
      setTimeout(async () => {
        const exitAnimation = this.animationCtrl
          .create()
          .addElement(pageElement)
          .duration(500)
          .easing('ease-in')
          .fromTo('opacity', '1', '0')
          .fromTo('transform', 'scale(1)', 'scale(0.95)');

        await exitAnimation.play();

        // Navigate to dashboard
        // Navigate to dashboard
        this.authService.loadUserFromToken();
        this.role = this.authService.getUserRole();
        if (this.role === "CORDINATEUR") {
          await this.router.navigate(['/coordinator-dashboard'], {
            replaceUrl: true
          });
        } else if (this.role === 'CANDIDAT') {
          await this.router.navigate(['/candidat-dashboard'], {
            replaceUrl: true
          });
        } else if (this.role === 'JURY') {
          await this.router.navigate(['/jury-dashboard'], {
            replaceUrl: true
          });
        } else {
          await this.router.navigate(['/unauthorized'], {
            replaceUrl: true
          });
        }
      }, 2000);
    } else {
      // Fallback navigation
      setTimeout(() => {
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      }, 400);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}




