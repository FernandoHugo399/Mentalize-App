import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
})
export class ConfiguracoesPage implements OnInit {
  public darkMode: boolean;

  constructor(
    private alertController: AlertController
    ) { }

  ngOnInit() {
    if(document.body.getAttribute('color-theme') === 'dark'){
      this.darkMode = true;
    } else{
      this.darkMode = false;
    }
  }

  toggleTheme(event: string){
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

  async presentAlertToggle() {
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
}
