import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor() { }

  queryBuilder(query: any): string {
    let keyValue: any;
    Object.keys(query).map(k => {
      if (k) {
        keyValue = `${keyValue ? `${keyValue}&` : ''}${k}=${query[k]}`;
      }
    });

    return keyValue ? `?${keyValue}` : '';
  }
}
