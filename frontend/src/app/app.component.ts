import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// third-party
import { BehaviorSubject } from 'rxjs';
import { faEye, faEyeSlash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// services
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  selectedItem: any;
  showDetails = true;
  isAdding: boolean;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faPlusCircle = faPlusCircle;

  title = 'bios-fe';

  private _products$ = new BehaviorSubject<any>([]);
  products$ = this._products$.asObservable();

  constructor(
    private fb: FormBuilder,
    private _productsService: ProductsService,
  ) {
    this.products$ = this._productsService.products;
    this._productsService.getProducts();

    this.initForm();
    this.selectItem();
  }

  get _id() { return this.form.get('_id'); }
  get name() { return this.form.get('name'); }
  get shortDescription() { return this.form.get('shortDescription'); }
  get detailedDescription() { return this.form.get('detailedDescription'); }
  get supplier() { return this.form.get('supplier'); }
  get supplierPrice() { return this.form.get('supplierPrice'); }
  get sellingPrice() { return this.form.get('sellingPrice'); }
  get sku() { return this.form.get('sku'); }


  initForm() {
    this.form = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      shortDescription: [''],
      detailedDescription: [''],
      supplier: [''],
      supplierPrice: [0],
      sellingPrice: [0],
      sku: [''],
    });
  }

  addNew() {
    this.isAdding = true;
    this.form.reset();
  }

  cancelEdits() {
    this.isAdding = false;
    this.form.reset();
    this.selectItem();
    this.form.patchValue({ ...this.selectedItem }, { emitEvent: true });
  }

  deleteItem() {
    const value = {
      ...this.selectedItem,
      isDeleted: true,
    };

    this._productsService.saveItem(value);
    this.form.reset();
  }

  save() {
    this._productsService.saveItem(this.form.value);
  }

  selectItem(item: any = null) {
    if (!item) {
      this.products$.subscribe((products: any) => {
        if (products && products.length) {
          this.selectedItem = this.selectedItem || products[0];
          this.form.patchValue({ ...this.selectedItem }, { emitEvent: true });
          this.isAdding = !this.selectedItem;
        } else {
          console.log('no products');
          this.selectedItem = null;
          this.isAdding = true;
        }
      });
    } else {
      this.selectedItem = item;
      this.form.patchValue({ ...this.selectedItem }, { emitEvent: true });
    }
  }
}
