import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { addIcons } from 'ionicons';
import { chevronBack, chevronForward, logOutOutline, personOutline } from 'ionicons/icons';

addIcons({
  'chevron-back': chevronBack,
  'chevron-forward': chevronForward,
  'log-out-outline': logOutOutline,
  'person-outline': personOutline
});

(async () => {
  try {
    await bootstrapApplication(AppComponent, {
      providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideIonicAngular({
          mode: 'ios',
        }),
        provideRouter(routes),
        provideHttpClient()
      ],
    });
  } catch (error) {
    console.error('Error bootstrapping application:', error);
  }
})();
