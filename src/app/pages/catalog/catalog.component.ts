import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../shared/services/product';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CartService } from '../../shared/services/cart.service';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: Product[] = []
  constructor(
    private db: AngularFirestore,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.db.collection("products").snapshotChanges()
      .subscribe(colSnap => {
        this.products = []
        colSnap.forEach(snap => {
          let product: any = snap.payload.doc.data()
          this.products.push(product)
        })
        console.log(this.products);

      })
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product)
    Swal.fire({  
      position: 'top-end',  
      icon: 'success',  
      title: product.name+' Added to Cart',  
      showConfirmButton: false,  
      timer: 1000  
    }) 
  }
}
