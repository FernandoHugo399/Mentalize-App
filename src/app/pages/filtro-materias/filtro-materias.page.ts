import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publish } from 'src/app/interfaces/publish';
import { PublishService } from 'src/app/services/publish.service';

@Component({
  selector: 'app-filtro-materias',
  templateUrl: './filtro-materias.page.html',
  styleUrls: ['./filtro-materias.page.scss'],
})
export class FiltroMateriasPage implements OnInit {
  public publish: Publish[];
  public matter: string;

  constructor(private publishService: PublishService, private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.matter = this.activatedRoute.snapshot.paramMap.get('materia') as string;
    this.publish = await this.getPublish();
  }

  async getPublish() {
    return await this.publishService.getPublishByMatter(this.matter);
  }

  async doRefresh(event: any) {
    this.publish = await this.getPublish();
    event.target.complete();
  }

}
