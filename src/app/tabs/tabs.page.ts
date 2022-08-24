import { Location } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { AlertController, IonTabs, Platform } from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild('tabs', {static: true}) ionTabs: IonTabs;
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
