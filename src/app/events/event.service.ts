import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventModel} from './event-model';

@Injectable()
export class EventService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  findAll(page: number = 0, limit: number = 2): Observable<HttpResponse<Array<EventModel>>> {
    return this.http.get<Array<EventModel>>(`${this.apiUrl}/events?_page=${page}&_limit=${limit}`, { observe: 'response' });
  }

  findOne(id): Observable<EventModel> {
    return this.http.get<EventModel>(`${this.apiUrl}/events/${id}`);
  }

  save(eventModel: EventModel): Observable<EventModel> {
    if (eventModel.id) {
      // update
      return this.http.put<EventModel>(`${this.apiUrl}/events/${eventModel.id}`, eventModel);
    } else {
      // create
      return this.http.post<EventModel>(`${this.apiUrl}/events`, eventModel);
    }
  }

  remove(id: number): Observable<any>  {
    return this.http.delete(`${this.apiUrl}/events/${id}`);
  }
}
