import { Publish } from './../../interfaces/publish';
import { DataService, INivelEnsino } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { IMateria } from 'src/app/services/data.service';
import { SearchbarCustomEvent, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pesquisar',
  templateUrl: 'pesquisar.page.html',
  styleUrls: ['pesquisar.page.scss']
})
export class PesquisarPage implements OnInit {
  public nivelEnsino: INivelEnsino[];
  public materias: IMateria[];
  public allPublishes: Publish[];
  public queryText = '';
  public publishes: Publish[];

  public filterInstitutions(_event: Event){
    const event = _event as SearchbarCustomEvent;
    const query = event.target.value;

    if(query && query.trim() !== ''){
      this.publishes = this.allPublishes
      .filter((publishes)=> publishes.titulo.toLowerCase().indexOf(query.toLowerCase()) > -1 );
    } else {
      this.publishes = this.allPublishes;
    }
  }

  constructor(private dataService: DataService) {
    this.nivelEnsino = dataService.nivelEnsino;
    this.materias = dataService.materias;
  }
  ngOnInit(): void {
    this.nivelEnsino = this.dataService.nivelEnsino;
    this.materias = this.dataService.materias;
  }
}
