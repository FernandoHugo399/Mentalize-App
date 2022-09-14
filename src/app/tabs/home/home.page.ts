import { Component, OnInit } from '@angular/core';
import { Publish } from 'src/app/interfaces/publish';
import { PublishService } from 'src/app/services/publish.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{
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
