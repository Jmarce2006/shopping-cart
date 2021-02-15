import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/services/product';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart = []
  total = 0
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem("cart"))
    console.log(this.cart);


  }
  addToCart(product: Product) {
    this.cartService.addProduct(product)
    this.cart = JSON.parse(localStorage.getItem("cart"))
  }
  removeToCart(product: Product) {
    this.cartService.decreaseProduct(product)
    this.cart = JSON.parse(localStorage.getItem("cart"))
  }

  getTotal() {
    this.total = this.cart.reduce((i, j) => i + j.price * j.qty, 0);
    return this.total;
  }
}
