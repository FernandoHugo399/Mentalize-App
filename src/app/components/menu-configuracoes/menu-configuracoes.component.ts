import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu-configuracoes',
  templateUrl: './menu-configuracoes.component.html',
  styleUrls: ['./menu-configuracoes.component.scss'],
})
export class MenuConfiguracoesComponent implements OnInit {

  public darkMode: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private menuController: MenuController
    ) {
      this.routerEvent();
    }

  ngOnInit() {
    if(document.body.getAttribute('color-theme') === 'dark'){
      this.darkMode = true;
    } else{
      this.darkMode = false;
    }
  }

  public logout(){
    this.authService.logout();
  }

  public toggleTheme(event: string){
    if(event === 'dark'){
      localStorage.setItem('color-theme', 'dark');
      document.body.setAttribute('color-theme', 'dark');
      this.darkMode = true;
    } else {
      localStorage.setItem('color-theme', 'light');
      document.body.setAttribute('color-theme', 'light');
      this.darkMode = false;
    }
  }

  public async presentAlertToggleTheme() {
    let inputs = [];
    if(!this.darkMode){
      inputs = [
        {
          label: 'Modo Claro',
          type: 'radio',
          value: 'light',
          checked: true
        },
        {
          label: 'Modo Escuro',
          type: 'radio',
          value: 'dark',
        }
      ];
    } else {
      inputs = [
        {
          label: 'Modo Claro',
          type: 'radio',
          value: 'light'
        },
        {
          label: 'Modo Escuro',
          type: 'radio',
          value: 'dark',
          checked: true
        }
      ];
    }

    const alert = await this.alertController.create({
      header: 'Tema',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
            const { data } = await alert.onDidDismiss();
            this.toggleTheme(data.values);
          },
        },
      ],
      inputs
    });

    await alert.present();
  }

  private routerEvent(){
    this.router.events.pipe( filter( ( event: NavigationEnd ) => ( event instanceof NavigationEnd )))
    .subscribe((event: NavigationEnd)=>{
      if(this.menuController.isOpen()){
        this.menuController.close();
      }
    });
  }
}
