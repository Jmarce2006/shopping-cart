import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Product } from '../../../shared/services/product';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @ViewChild('closebutton') closebutton;

  productForm: FormGroup;
  selectedFileImage: FileList
  product: Product = {
    name: "",
    categoryUid:"",
    description: "",
    price: 0,
    photoURL: "",
    uid: ""
  }
  categories = []
  progressBarValueImage = ""
  constructor(
    private db: AngularFirestore,
    private afStorage: AngularFireStorage,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      description: ['', [Validators.required]],

      categoryUid: ['', [Validators.required]],
      price: ['', [Validators.required]],
    })
    this.getCategories()
  }

  getCategories() {
    this.db.collection("categories").snapshotChanges()
      .subscribe(colSnap => {
        this.categories = []
        colSnap.forEach(snap => {
          let category: any = snap.payload.doc.data()
          this.categories.push(category)
          // console.log(category);

        })
      })
  }

  // getProducts(){
  //   this.db.collection("products").snapshotChanges
  // }

  chooseFileImage(event) {
    this.selectedFileImage = event.target.files
    if (this.selectedFileImage.item(0)) {
      this.uploadImage()
    }
  }

  uploadImage() {
    var filePath = `products/${this.selectedFileImage.item(0).name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.afStorage.ref(filePath);
    const uploadTask = this.afStorage.upload(filePath, this.selectedFileImage.item(0))

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.product.photoURL = url
        })
      })
    ).subscribe()
    uploadTask.percentageChanges().subscribe((value) => {
      this.progressBarValueImage = value.toFixed(0)
    })
  }

  onSubmit() {
    this.closebutton.nativeElement.click()
    this.product.name = this.productForm.value.name
    this.product.description = this.productForm.value.description
    this.product.price = this.productForm.value.price
    this.product.categoryUid = this.productForm.value.categoryUid

    this.db.collection("products").add(this.product).then((res: any) => {
      res.set({ uid: res.id }, { merge: true }).then(() => {
        console.log("Your extra id field has been created");
      })
      //show alert create
    })

  }
}
