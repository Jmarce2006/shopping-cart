import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders = []
  constructor(

    private db: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders() {
    this.db.collection("orders").snapshotChanges()
      .subscribe(colSnap => {
        this.orders = []
        colSnap.forEach(snap => {
          let order: any = snap.payload.doc.data()
          this.orders.push(order)
        })
        console.log(this.orders);

      })
  }
}
