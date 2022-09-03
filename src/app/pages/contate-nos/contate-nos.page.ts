import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Message } from 'src/app/interfaces/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-contate-nos',
  templateUrl: './contate-nos.page.html',
  styleUrls: ['./contate-nos.page.scss'],
})
export class ContateNosPage {
  disableButton: boolean;
  public message: Message = {
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  };

  constructor(
    private messageService: MessageService,
    private toastController: ToastController,
    ) { }

  public async addMessage() {
  this.disableButton = true;
  const { nome, email, telefone, mensagem } = this.message;
  try {
    if (!email || !mensagem || !nome || !telefone) {
      throw new Error('Todos os campos não foram preenchidos!');
    }

    const messageFormated = this.formatMessage(this.message);
    await this.messageService.addMessage(messageFormated);
    this.successToastr();

  } catch (error) {
    this.errorToastr(error.message);
  } finally {
    this.disableButton = false;
    this.message = {
      email: '',
      mensagem: '',
      nome: '',
      telefone: '',
    };
  }

  }

  public async errorToastr(message: string){
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  public async successToastr() {
    const toast = await this.toastController.create({
      message: 'Mensagem enviada com sucesso!',
      duration: 2000,
      color: 'success'
    });
    toast.present();
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
}
