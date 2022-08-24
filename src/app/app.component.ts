import { Component } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.showSplash();

  }

  private async showSplash() {
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true,
      fadeInDuration: 100,
      fadeOutDuration: 100
    });
  }
}

