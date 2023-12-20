import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class UploadService {
  private apiUrl = 'http://127.0.0.1:8000/upload';

  constructor(private http: HttpClient) {}

  uploadFile(file: File, name: string) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('item', file);

    return this.http.post<any>(this.apiUrl, formData);
  }
}
