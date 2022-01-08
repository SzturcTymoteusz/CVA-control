import {Injectable} from '@angular/core';
import {SelectProduct} from "./select-product";
import {ProductControlValue} from "../product-control-value/product-control-value";
import {Product} from "../../models/product";
import {InvokeOnChange} from "../invoke-on-change/invoke-on-change";

@Injectable()
export class SelectProductService implements SelectProduct {

  constructor(private productControlValue: ProductControlValue, private invokeOnChange: InvokeOnChange) {
  }

  select(product: Product) {
    this.productControlValue.value = product;
    this.invokeOnChange.invoke();
  }
}
