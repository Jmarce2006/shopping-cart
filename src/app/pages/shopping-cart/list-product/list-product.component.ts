import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../../shared/services/product';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  productList: Product[] = []
  constructor(
    private db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {


    this.db.collection("products").snapshotChanges()
      .subscribe(colSnap => {
        this.productList = []
        colSnap.forEach(snap => {
          let product: any = snap.payload.doc.data()
          this.productList.push(product)
        })
      })
  }

}
