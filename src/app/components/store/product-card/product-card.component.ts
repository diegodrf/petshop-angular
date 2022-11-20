import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product!: Product;
  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

  }

  addToCart() {
    let cart = this.cartService.get();
    let item = new CartItem(this.product, 1);
    cart.addItem(item);
    this.cartService.save(cart);
    this.toastr.success(`${this.product.title} adicionado ao carrinho.`);
  }

}
