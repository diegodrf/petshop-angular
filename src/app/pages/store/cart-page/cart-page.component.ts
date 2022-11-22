import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  public cart!: Cart;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart() {
    this.cart = this.cartService.get();
  }

  public remoteItem(item: CartItem) {
    this.cart.removeItem(item);
    this.cartService.save(this.cart);
  }

  public clearCart() {
    this.cartService.clear();
    this.loadCart();
  }

}
