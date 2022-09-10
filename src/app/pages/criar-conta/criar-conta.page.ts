import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage {
  public userRegister: User = {genero: ''};
  public disableButton: boolean;
  private loading: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    ) { }

  async register() {
    this.disableButton = true;
    await this.presentLoading();

    try {
      if(!this.userRegister.email || !this.userRegister.nome || !this.userRegister.password) {
          throw new Error('Preencha todos os campos!');
      }

      const user = this.filterUser(this.userRegister);
      await this.authService.register(user);

    } catch (error) {
      this.presentToast(error.message);

    } finally {
      this.loading.dismiss();
      this.disableButton = false;
      this.userRegister = {genero: ''};
    }
  }

  private filterUser(user: User): User {
    return {
      email: user.email.trim(),
      nome: user.nome.trim(),
      password: user.password
    };
  }

  private async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  private async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000, color: 'danger' });
    toast.present();
  }

}


