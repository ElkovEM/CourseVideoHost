// item.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'any'
})
export class ItemService {
  private apiUrl = 'http://127.0.0.1:8000/items';

  constructor(private http: HttpClient) {}

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getItemById(id: string): Observable<Item> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Item>(url);
  }
}
