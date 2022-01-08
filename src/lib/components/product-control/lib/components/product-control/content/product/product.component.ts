import {Component, Input} from '@angular/core';
import {Product} from "../../../../models/product";
import {ProductControlValue} from "../../../../services/product-control-value/product-control-value";
import {SelectProduct} from "../../../../services/select-product/select-product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product!: Product;
  @Input() disabled!: boolean;

  constructor(public productControlValue: ProductControlValue, public selectProduct: SelectProduct) {
  }
}
