import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';
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
    private location: Location,
  )
  {
    this.platform.ready().then(()=>{
      document.body.setAttribute('color-theme', localStorage.getItem('color-theme'));
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
      }
      if(this.routesUrl.length < 3){
        this.routesUrl.push(event.id);
      }
    });
  }

  private backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(999999, ()=>{
      const url = this.router.routerState.snapshot.url;
      this.routesUrl.splice(-2);

      if(this.routesUrl.length === 0) {
        App.exitApp();
      }

      this.location.back();
    });
  }
}

