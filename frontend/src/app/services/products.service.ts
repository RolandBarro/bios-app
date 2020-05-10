import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

// services
import { environment as env } from '../../environments/environment';
import { HttpHelperService } from './http-helper.service';
import { ProductItem } from '../models/product-item.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiBase = env.apiBaseUrl;

  private _products$ = new BehaviorSubject<any>(null);
  private products$ = this._products$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private _httpHelper: HttpHelperService,
  ) { }

  get products() {
    return this.products$;
  }

  getProducts(query: any = '') {
    const { apiBase } = this;
    const { queryBuilder } = this._httpHelper;

    return this.httpClient.get(`${apiBase}/products${queryBuilder(query)}`)
      .subscribe(
        (response: any) => {
          this._products$.next(response.data);
        },
        (err) => {
          throw new Error(err.error.message) ;
        }
      );
  }

  saveItem(data: ProductItem) {
    if (data._id) {
      return this.updateItem(data);
    }

    this.addItem(data);
  }

  addItem(data) {
    const { apiBase } = this;

    return this.httpClient.post(`${apiBase}/products`, data)
      .subscribe(
        (response: any) => {
          if (response && response.data) {
            this.getProducts();
          }
        },
        (err) => {
          throw new Error(err.error.message) ;
        }
      );
  }

  updateItem(data: ProductsService) {
    const { apiBase } = this;
    
    return this.httpClient.put(`${apiBase}/products`, data)
      .subscribe(
        (response: any) => {
          if (response && response.data) {
            this.getProducts();
          }
        },
        (err) => {
          throw new Error(err.error.message) ;
        }
      );
  }
}
