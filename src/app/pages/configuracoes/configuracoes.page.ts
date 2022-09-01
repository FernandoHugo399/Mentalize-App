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
    private messageService: MessageService,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController
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

  public async presentAlertSendMessage() {
    const alert = await this.alertController.create({
      header: 'Preencha seus dados',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Enviar',
          role: 'confirm',
          handler: async () => {
            const { data } = await alert.onDidDismiss();
            const { nome, email, telefone, mensagem } = data.values;
            try {
              if (!email || !mensagem || !nome || !telefone) {
                throw new Error('Todos os campos não foram preenchidos!');
              }

              const message = this.formatMessage(data.values);
              await this.addMessage(message);
              this.successToastr();
            } catch (error) {
              this.errorToastr(error.message);
            }
          },
        },
      ],
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome',
        },
        {
          name: 'email',
          placeholder: 'Email',
        },
        {
          name: 'telefone',
          placeholder: 'Telefone'
        },
        {
          type: 'textarea',
          placeholder: 'Mensagem',
          name: 'mensagem'
        },
      ],
    });

    await alert.present();
  }

  public async addMessage(message: Message) {
    this.messageService.addMessage(message);
  }

  private formatMessage(message: Message): Message {
    const formatedNome = message.nome.trim();
    const formatedEmail = message.email.trim();
    const formatedMensagem = message.mensagem.trim();
    const formatedTelefone = message.telefone.toString()
    .trim().replace(',', '').replace('.', '').replace('-', '').replace(/\s/g, '');

    const formatedMessage = {
      email: formatedEmail,
      mensagem: formatedMensagem,
      nome: formatedNome,
      telefone: formatedTelefone
    };

    return formatedMessage;
  }

  private async errorToastr(message: string){
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  private async successToastr() {
    const toast = await this.toastController.create({
      message: 'Mensagem enviada com sucesso!',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
}
