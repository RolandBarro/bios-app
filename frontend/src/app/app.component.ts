import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// third-party
import { faEye, faEyeSlash, faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

// services
import { ProductsService } from './services/products.service';
import { UtilityService } from './services/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  searchForm: FormGroup;
  selectedItem: any;
  showDetails = false;
  isAdding: boolean;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faPlusCircle = faPlusCircle;
  faSearch = faSearch;

  title = 'bios-fe';

  private _products$ = new BehaviorSubject<any>([]);
  products$ = this._products$.asObservable();

  constructor(
    private fb: FormBuilder,
    private _productsService: ProductsService,
    private _utilityService: UtilityService,
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
  get filter() {return this.searchForm.get('filter'); }

  initForm() {
    this.searchForm = this.fb.group({
      filter: [''],
    });

    this.filter.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(value => value)
    ).subscribe(search => {
      this._productsService.getProducts({ search });
    });

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
    this.showDetails = true;
    this.form.reset();
    this._utilityService.scrollToSection('itemForm');
  }

  cancelEdits() {
    this.isAdding = false;
    this.showDetails = false;
    this.form.reset();
    this.selectItem();
    this._utilityService.scrollToSection('itemList');
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
    this.isAdding = false;
    this.showDetails = false;
    this.selectItem();
  }

  selectItem(item: any = null) {
    if (!item) {
      this.products$.subscribe((products: any) => {
        if (products && products.length) {
          this.selectedItem = this.selectedItem || products[0];
          this.form.patchValue({ ...this.selectedItem }, { emitEvent: true });
          this.isAdding = !this.selectedItem;
          this._utilityService.scrollToSection('itemDetails');
        } else {
          console.log('no products');
          this.selectedItem = null;
          this.isAdding = true;
        }
      });
    } else {
      this.selectedItem = item;
      this.showDetails = true;
      this.form.patchValue({ ...this.selectedItem }, { emitEvent: true });
      this._utilityService.scrollToSection('itemDetails');
    }
  }
}
