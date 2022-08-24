import { Location } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { App } from '@capacitor/app';
import { AlertController, IonTabs, Platform } from '@ionic/angular';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  private routesUrl = [];
  constructor(
    private platform: Platform,
    private router: Router,
    private alertController: AlertController,
    private location: Location,
  )
  {
    this.routerEvent();

    this.platform.ready().then(()=>{
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
