import { Component, OnInit } from '@angular/core';
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
  constructor(
    private authService: AuthService,
    private toastCtrl: ToastController,
  ) { }

  async login() {
    this.isLogin = true;

    try {
      await this.authService.login(this.userLogin);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.isLogin = false;
      this.userLogin = {};
    }
  }

  async googleSignIn() {
    this.isLogin = true;
    try {
      await this.authService.googleSignIn();
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.isLogin = false;
    }
  }

  async githubSignIn() {
    this.isLogin = true;
    try {
      await this.authService.githubSignIn();
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.isLogin = false;
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 , color: 'danger'});
    toast.present();
  }
}
