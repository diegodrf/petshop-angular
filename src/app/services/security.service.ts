import { Injectable } from '@angular/core';
import { User } from '../models/user';

const PETSHOP_USER = 'petshopuser';
const PETSHOP_TOKEN = 'petshoptoken';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }

  public set(user: User, token: string) {
    const data = JSON.stringify(user);

    localStorage.setItem(PETSHOP_USER, data);
    localStorage.setItem(PETSHOP_TOKEN, token);
  }

  public setUser(user: User) {
    const data = JSON.stringify(user);
    localStorage.setItem(PETSHOP_USER, data);
  }

  public setToken(token: string) {
    localStorage.setItem(PETSHOP_TOKEN, token);
  }

  public getUser(): User | null {
    const data = localStorage.getItem(PETSHOP_USER);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  public getToken(): string | null {
    const data = localStorage.getItem(PETSHOP_TOKEN);
    if (data) {
      return data;
    } else {
      return null;
    }
  }

  public hasToken(): boolean {
    if (this.getToken())
      return true;
    else
      return false;
  }

  public clear() {
    localStorage.removeItem(PETSHOP_USER);
    localStorage.removeItem(PETSHOP_TOKEN);
  }
}
