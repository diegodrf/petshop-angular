import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

const PETSHOP_CART = 'petshopcart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  public get(): Cart {
    let data = localStorage.getItem(PETSHOP_CART);
    let cart = new Cart();

    if (!data) {
      return cart;
    }

    let items: CartItem[] = JSON.parse(data).items;
    items.forEach(element => cart.addItem(element));

    return cart;
  }

  public save(cart: Cart) {
    localStorage.setItem(PETSHOP_CART, JSON.stringify(cart));
  }

  public clear() {
    localStorage.removeItem(PETSHOP_CART);
  }

}
