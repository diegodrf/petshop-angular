import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url: string = 'http://localhost:3001';

  constructor(
    private httpClient: HttpClient,
    private securityService: SecurityService
  ) { }

  private composeHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    let token = this.securityService.getToken();
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

  resetPassword(data: any) {
    return this.httpClient.post(`${this.url}/accounts/reset-password`, data);
  }

  getProfile() {
    return this.httpClient.get(`${this.url}/accounts`, { headers: this.composeHeaders() })
  }

  updateProfile(data: any) {
    return this.httpClient.put(`${this.url}/accounts`, { headers: this.composeHeaders() })
  }
}
