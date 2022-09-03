import { MessageService } from './../../services/message.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/message';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
})
export class ConfiguracoesPage implements OnInit {
  public darkMode: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    ) { }

  ngOnInit() {
    if(document.body.getAttribute('color-theme') === 'dark'){
      this.darkMode = true;
    } else{
      this.darkMode = false;
    }
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
}
