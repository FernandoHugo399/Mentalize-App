import { ToastController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Publish } from 'src/app/interfaces/publish';
import { DataService, IMateria, INivelEnsino } from 'src/app/services/data.service';
import { PublishService } from 'src/app/services/publish.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'publicar.page.html',
  styleUrls: ['publicar.page.scss']
})
export class PublicarPage implements OnInit {
  @ViewChild('fileInput') fileInput: {nativeElement: HTMLInputElement};
  @ViewChild('imageContainer') imageContainer: {nativeElement: HTMLInputElement};
  public nivelEnsino: INivelEnsino[];
  public materias: IMateria[];
  public publish: Publish = {};
  public disableButton: boolean;
  constructor(
    private dataService: DataService,
    private publishService: PublishService,
    private toastController: ToastController
    ) {
    this.nivelEnsino = dataService.nivelEnsino;
    this.materias = dataService.materias;
  }
  ngOnInit(): void {
    this.nivelEnsino = this.dataService.nivelEnsino;
    this.materias = this.dataService.materias;
  }

  readURL(archive: Event): void{
    const arc = (archive.target as HTMLInputElement).files[0];
    if (arc) {
      const reader = new FileReader();
      reader.onload = e => {
        this.imageContainer.nativeElement.setAttribute('src', e.target.result as string);
        this.publish.file = arc;
      };
      reader.readAsDataURL(arc);
    }
  }

  clearPreview(): void {
    this.imageContainer.nativeElement.setAttribute('src', '/assets/810x520.png');
    this.publish.file = undefined;
  }

  async sendPublish() {
    this.disableButton = true;
    const { titulo, descricao, materia, nivelEnsino, file } = this.publish;
    try {
      if(!titulo || !descricao || !materia || !nivelEnsino){
        throw new Error('Preencha todos os campos');
      }

      if(!file){
        throw new Error('Coloque uma imagem');
      }

      if (file.size > 4 * 1024 * 1024) {
        throw new Error('A imagem é muito pesada - Max: 4Mb');
      }

      const filterPublish = this.filterPublish(this.publish);
      await this.publishService.addPublish(filterPublish, this.publish.file);
      this.successToastr();
    } catch (error) {
      this.errorToastr(error.message);
    } finally {
      this.imageContainer.nativeElement.setAttribute('src', '/assets/810x520.png');
      this.publish = {};
      this.disableButton = false;
    }
  }

  private filterPublish(publish: Publish): Publish {
    const format = publish.file.name.split('.');

    return{
      titulo: publish.titulo.trim(),
      descricao: publish.descricao.trim(),
      materia: publish.materia,
      nivelEnsino: publish.nivelEnsino,
      imagem: Date.now() + format[0],
      dataPublicacao: Date.now().toString()
    };
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
      message: 'Publicação enviada com sucesso!',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
}

