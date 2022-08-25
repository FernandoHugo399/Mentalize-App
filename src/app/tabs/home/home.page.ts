import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Platform, AlertController, IonRouterOutlet } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(
    private platform: Platform,
    private router: Router,
    private alertController: AlertController,
    private location: Location,
  )
  {
    this.platform.ready().then(()=>{
      this.backButtonEvent();
    });
  }

  private backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(999999, ()=>{
      const url = this.router.routerState.snapshot.url;

      if(url === '/tabs/home') {
        this.backButtonALert();
      } else {
        this.location.back();
      }
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
