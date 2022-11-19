import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url: string = 'http://localhost:3001';

  constructor(private httpClient: HttpClient) { }

  private composeHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('petshop.token');
    if (token != null) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.url}/products`);
  }

  authenticate(username: string, password: string) {
    let body = {
      'username': username,
      'password': password
    }
    return this.httpClient.post(`${this.url}/accounts/authenticate`, body,
      {
        headers: { 'Content-Type': 'application/json' }
      });
  }

  refreshToken() {
    return this.httpClient.post(
      `${this.url}/accounts/refresh-token`,
      null,
      { headers: this.composeHeaders() })
  }

  create(data: any) {
    return this.httpClient.post(`${this.url}/accounts`, data);
  }
}
