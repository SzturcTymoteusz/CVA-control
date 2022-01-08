import {Injectable} from '@angular/core';
import {ProductControlValue} from "./product-control-value";
import {Product} from "../../models/product";

@Injectable()
export class ProductControlValueService implements ProductControlValue {
  private _value: Product = {
    id: 0,
    name: '',
    description: ''
  };

  set value(product: Product) {
    this._value = product;
  }

  get value(): Product {
    return this._value;
  }
}
