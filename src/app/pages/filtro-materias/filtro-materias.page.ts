import { Component, OnInit } from '@angular/core';
import { Publish } from 'src/app/interfaces/publish';
import { PublishService } from 'src/app/services/publish.service';

@Component({
  selector: 'app-filtro-materias',
  templateUrl: './filtro-materias.page.html',
  styleUrls: ['./filtro-materias.page.scss'],
})
export class FiltroMateriasPage implements OnInit {
  public publish: Publish[];

  constructor(private publishService: PublishService) { }

  async ngOnInit() {
    this.publish = await this.getPublish();
  }

  async getPublish() {
    return await this.publishService.getPublishs();
  }

  async doRefresh(event: any) {
    this.publish = await this.getPublish();
    event.target.complete();
  }

}
