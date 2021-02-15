import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {



  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor() { }


  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product: Product) {

    let added = false;
    for (let p of this.cart) {
      if (p.uid === product.uid) {
        p.qty += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.qty = 1
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);

  }

  decreaseProduct(product: Product) {
    let cont = 0

    for (const p of this.cart) {
      if (p.uid === product.uid) {
        p.qty -= 1;
        if (p.qty == 0) {
          this.cart.splice(cont, 1);
        }
      }
      cont++;
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product: Product) {
    let cont = 0
    for (const p of this.cart) {
      if (p.uid === product.uid) {

        this.cartItemCount.next(this.cartItemCount.value - p.cantidad);
        p.cantidad = 1
        this.cart.splice(cont, 1);
      }
      cont++;
    }
  }
  decreaseStock(product) {
    product.stock = product.stock - 1;

  }
  increaseStock(product) {
    product.stock = product.stock + 1;

  }
  restoreStock(product) {
    product.stock = product.stockBackup;
  }
  async cleanCart() {
    this.cart.splice(0, this.cart.length);
    this.cartItemCount.next(0);
  }
}
