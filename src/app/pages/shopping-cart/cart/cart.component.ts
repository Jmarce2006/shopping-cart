import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../../../shared/services/messenger.service';
import { CartService } from '../../../shared/services/cart.service';
import { Product } from '../../../shared/services/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [];

  cartTotal = 0

  constructor(
    private msg: MessengerService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.handleSubscription();
    this.loadCartItems();
  }

  handleSubscription() {
    this.msg.getMsg().subscribe((product: Product) => {
      this.loadCartItems();
    })
  }

  loadCartItems() {

    this.cartItems = this.cartService.getCart()
    console.log(this.cartItems);
    
    this.calcCartTotal();

  }

  calcCartTotal() {
    this.cartTotal = 0
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }

}
