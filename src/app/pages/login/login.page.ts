import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public isLogin = false;
  public userLogin: User = {};
  private loading: any;
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) { }

  async login() {
    this.isLogin = true;
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
      this.isLogin = false;
      this.userLogin = {};
    }
  }

  async googleSignIn() {
    this.isLogin = true;
    await this.presentLoading();
    try {
      await this.authService.googleSignIn();
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
      this.isLogin = false;
    }
  }

  async githubSignIn() {
    this.isLogin = true;
    await this.presentLoading();
    try {
      await this.authService.githubSignIn();
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
      this.isLogin = false;
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 , color: 'danger'});
    toast.present();
  }
}
