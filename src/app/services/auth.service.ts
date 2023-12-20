import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class AuthService {

  private readonly TOKEN_KEY = 'jwtToken';

  constructor(private http:HttpClient) { }
  login(data: any):Observable<any>{
    return this.http.post(`http://127.0.0.1:8000/login`, data);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

    // Метод для получения токена из Local Storage
    getToken(): string | null {
      return localStorage.getItem(this.TOKEN_KEY);
    }
  
    // Метод для удаления токена из Local Storage
    removeToken(): void {
      localStorage.removeItem(this.TOKEN_KEY);
    }

}   
  