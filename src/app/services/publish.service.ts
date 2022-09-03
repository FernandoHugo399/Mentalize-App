import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publish } from '../interfaces/publish';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublishService {
  private placeholderURL = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) { }

  getAllInstitutions(): Observable<Publish[]> {
    return this.http.get<Publish[]>(this.placeholderURL)
    .pipe(tap((res)=>{

    }));
  }
}
