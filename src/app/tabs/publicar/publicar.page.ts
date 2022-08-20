import { Component, OnInit } from '@angular/core';
import { DataService, IMateria, INivelEnsino } from 'src/app/services/data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'publicar.page.html',
  styleUrls: ['publicar.page.scss']
})
export class PublicarPage implements OnInit {
  public nivelEnsino: INivelEnsino[];
  public materias: IMateria[];

  constructor(private dataService: DataService) {
    this.nivelEnsino = dataService.nivelEnsino;
    this.materias = dataService.materias;
  }
  ngOnInit(): void {
    this.nivelEnsino = this.dataService.nivelEnsino;
    this.materias = this.dataService.materias;
  }
}
