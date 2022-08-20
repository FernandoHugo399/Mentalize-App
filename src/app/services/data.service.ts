import { Injectable } from '@angular/core';

export interface INivelEnsino {
  nivel: string;
  descricao: string;
  icone: string;
 };


export interface IMateria {
  materia: string;
  descricao: string;
  icone: string;
 };

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public nivelEnsino: INivelEnsino[] = [
    {
      nivel: 'Fundamental I',
      descricao: 'Aqui você encontra assuntos referentes aos conteúdos do Fundamental I',
      icone: 'book-outline'
    },
    {
      nivel: 'Fundamental II',
      descricao: 'Aqui você encontra assuntos referentes aos conteúdos do Fundamental II',
      icone: 'book-outline'
    },
    {
      nivel: 'Ensino Médio',
      descricao: 'Aqui você encontra assuntos referentes aos conteúdos do Ensino Médio',
      icone: 'book-outline'
    }

  ];

  public materias: IMateria[] = [
    {
      materia: 'Artes',
      descricao: 'Aqui você encontro assuntos de Artes',
      icone: 'color-palette-outline'
    },
    {
      materia: 'Matemática',
      descricao: 'Aqui você encontro assuntos de Matemática',
      icone: 'calculator-outline'
    },
    {
      materia: 'Língua Portuguesa',
      descricao: 'Aqui você encontro assuntos de Português',
      icone: 'text-outline'
    },
    {
      materia: 'Literatura',
      descricao: 'Aqui você encontro assuntos de Literatura',
      icone: 'library-outline'
    },
    {
      materia: 'Línguas Estrangeiras',
      descricao: 'Aqui você encontro assuntos de Inglês e Espanhol',
      icone: 'language-outline'
    },
    {
      materia: 'Geografia',
      descricao: 'Aqui você encontro assuntos de Geografia',
      icone: 'earth-outline'
    },
    {
      materia: 'História',
      descricao: 'Aqui você encontro assuntos de História',
      icone: 'hourglass-outline'
    },
    {
      materia: 'Biologia',
      descricao: 'Aqui você encontro assuntos de Biologia',
      icone: 'leaf-outline'
    },
    {
      materia: 'Química',
      descricao: 'Aqui você encontro assuntos de Química',
      icone: 'beaker-outline'
    },
    {
      materia: 'Física',
      descricao: 'Aqui você encontro assuntos de Física',
      icone: 'magnet-outline'
    },
    {
      materia: 'Filosofia',
      descricao: 'Aqui você encontro assuntos de Filosofia',
      icone: 'skull-outline'
    },
    {
      materia: 'Sociologia',
      descricao: 'Aqui você encontro assuntos de Sociologia',
      icone: 'walk-outline'
    },
    {
      materia: 'Educação Física',
      descricao: 'Aqui você encontro assuntos de Educação Física',
      icone: 'football-outline'
    }
  ];

  constructor() { }
}
