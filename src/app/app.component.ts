import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { App } from '@capacitor/app';
import { AlertController, Platform } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private routesUrl = [];
  constructor(
    private platform: Platform,
    private router: Router,
    private alertController: AlertController,
    private location: Location,
  )
  {
    this.platform.ready().then(()=>{
      SplashScreen.hide();
      this.routerEvent();
      this.backButtonEvent();
    });
  }

  private routerEvent(){
    this.router.events.pipe( filter( ( event: NavigationEnd ) => ( event instanceof NavigationEnd )))
    .subscribe((event: NavigationEnd)=>{
      if(this.routesUrl.length === 0) {
        this.routesUrl.push(event.id, event.id);
      } else {
        this.routesUrl.push(event.id);
      }
    });
  }

  private backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(999999, ()=>{
      const url = this.router.routerState.snapshot.url;
      this.routesUrl.splice(-2);

      if(url === '/tabs/home'){
        if(this.routesUrl.length === 0) {
          this.backButtonALert();
        }
      }

      this.location.back();
    });
  }

  private async backButtonALert() {
    const alert = await this.alertController.create({
      message: 'Você quer fechar o App ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel'
        },
        {
          text: 'Fechar App',
          handler: () => {
            App.exitApp();
          }
        }
      ]
    });

    await alert.present();
  }
}

