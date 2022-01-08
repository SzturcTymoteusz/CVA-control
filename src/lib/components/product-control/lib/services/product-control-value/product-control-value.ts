import {Injectable} from "@angular/core";
import {ProductControlProvidersModule} from "../../product-control-providers.module";
import {ProductControlValueService} from "./product-control-value.service";
import {Product} from "../../models/product";

@Injectable({
  providedIn: ProductControlProvidersModule,
  useClass: ProductControlValueService
})
export abstract class ProductControlValue {
  abstract set value(product: Product);
  abstract get value(): Product;
}
