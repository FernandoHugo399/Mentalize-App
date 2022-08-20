import { DataService, INivelEnsino } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { IMateria } from 'src/app/services/data.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: 'pesquisar.page.html',
  styleUrls: ['pesquisar.page.scss']
})
export class PesquisarPage implements OnInit {
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
