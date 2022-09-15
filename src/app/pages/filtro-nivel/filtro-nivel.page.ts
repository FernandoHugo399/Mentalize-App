import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publish } from 'src/app/interfaces/publish';
import { PublishService } from 'src/app/services/publish.service';

@Component({
  selector: 'app-filtro-nivel',
  templateUrl: './filtro-nivel.page.html',
  styleUrls: ['./filtro-nivel.page.scss'],
})
export class FiltroNivelPage implements OnInit {
  public publish: Publish[];
  public nivel: string;

  constructor(private publishService: PublishService, private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.nivel = this.activatedRoute.snapshot.paramMap.get('nivel') as string;
    this.publish = await this.getPublish();
  }

  async getPublish() {
    return await this.publishService.getPublishByLevel(this.nivel);
  }

  async doRefresh(event: any) {
    this.publish = await this.getPublish();
    event.target.complete();
  }

}
