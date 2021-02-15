import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/services/order';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart = []
  total = 0
  order: Order = {
    uid: "",
    userUid: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    additional_info: "",
    total: 0,
    details: []
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private db: AngularFirestore,
  ) {
    this.order.userUid = this.authService.userData.uid
  }

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem("cart"))
    this.order.details = this.cart
  }
  getTotal() {
    this.total = this.cart.reduce((i, j) => i + j.price * j.qty, 0);
    this.order.total = this.total
    return this.total;
  }


  createOrder() {

    this.db.collection("orders").add(this.order).then((res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Order Complete',
        showConfirmButton: true
      })
      localStorage.setItem("cart", "")
      res.set({ uid: res.id }, { merge: true }).then(() => {
        this.router.navigate(["catalog"])
        console.log("Your extra id field has been created");
      })
      //show alert create
    })

  }
}
