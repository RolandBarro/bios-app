import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// third-party
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// services
import { HttpHelperService } from './services/http-helper.service';
import { ProductsService } from './services/products.service';
import { UtilityService } from './services/utility.service';

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

    // third-party
    FontAwesomeModule,
    NgbModule,
  ],
  providers: [
    HttpHelperService,
    ProductsService,
    UtilityService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
