import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductControlComponent} from "./components/product-control/product-control.component";
import {ContentComponent} from "./components/product-control/content/content.component";
import {HeaderComponent} from "./components/product-control/header/header.component";
import {ProductControlProvidersModule} from "./product-control-providers.module";
import {ProductComponent} from "./components/product-control/content/product/product.component";


@NgModule({
  declarations: [ProductControlComponent, ContentComponent, HeaderComponent, ProductComponent],
  imports: [
    CommonModule,
    ProductControlProvidersModule
  ],
  exports: [ProductControlComponent]
})
export class ProductControlModule {
}
