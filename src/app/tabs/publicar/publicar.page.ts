import { Component, OnInit, ViewChild } from '@angular/core';
import { Publish } from 'src/app/interfaces/publish';
import { DataService, IMateria, INivelEnsino } from 'src/app/services/data.service';

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

  constructor(private dataService: DataService) {
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
}

