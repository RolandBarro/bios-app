import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    @Inject(DOCUMENT)
    private _document: Document,
  ) { }

  scrollToSection(el: string, smoothScroll: boolean = true) {
    setTimeout(() => {
      const section = this._document.getElementById(el);
      console.log('el: ', el, section);

      if (section) {
        if (smoothScroll) {
          section.scrollIntoView({ behavior: 'smooth' });
        } else {
          section.scrollIntoView();
        }
      }
    }, 500);
  }
}
