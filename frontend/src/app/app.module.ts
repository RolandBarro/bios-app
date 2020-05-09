import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// services
import { HttpHelperService } from './services/http-helper.service';
import { ProductsService } from './services/products.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // third-part
    FontAwesomeModule,
  ],
  providers: [
    HttpHelperService,
    ProductsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
