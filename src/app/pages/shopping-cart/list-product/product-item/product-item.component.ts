import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../../shared/services/product';
import { CartService } from '../../../../shared/services/cart.service';
import { MessengerService } from '../../../../shared/services/messenger.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() productItem: Product;
  constructor(
    private cartService: CartService,
    private msg: MessengerService,
  ) { }

  ngOnInit(): void {
  }
  handleAddToCart() {
    this.cartService.addProduct(this.productItem)
    this.msg.sendMsg(this.productItem)
  }

}
