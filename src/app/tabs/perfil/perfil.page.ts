import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'perfil.page.html', 
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage {

  constructor(private authService: AuthService, private alertController: AlertController) {}

  async presentAlert() {
    const telefone = await this.alertController.create({
      header: 'Telefone',
      subHeader: 'Important message',
      message: '(81) 9 9976-0358',
      buttons: ['OK'],
    });
    await telefone.present();
  }

  async presentEmail() {
    const email = await this.alertController.create({
      header: 'E-mail',
      subHeader: 'Important message',
      message: 'natacataldi@gmail.com',
      buttons: ['OK'],
    });
    await email.present();
  }

  public logout(){
    this.authService.logout();
  }
}
