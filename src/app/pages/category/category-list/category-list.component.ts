import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categoryForm: FormGroup;
  categories = []
  @ViewChild('closebutton') closebutton;
  constructor(
    private db: AngularFirestore,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      description: ['', [Validators.required]]
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
          console.log(category);

        })
      })
  }

  onSubmit() {
    this.closebutton.nativeElement.click()
    this.db.collection("categories").add(this.categoryForm.value).then((res: any) => {
      console.log(res);
      res.set({ uid: res.id }, { merge: true }).then(() => {
        console.log("Your extra id field has been created");
      })
      //show alert create
    })

  }
  updateCategory(category) {
    this.db.collection("categories").
      doc(category.uid).update(category).then(() => {
        //show alert update
      }, error => {
        console.log(error);

      })
  }

  closeModalEdit() {
    this.getCategories()
  }

  resetInputs() {
    this.categoryForm.reset()
  }

}
