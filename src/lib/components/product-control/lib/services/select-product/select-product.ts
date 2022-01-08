import {Injectable} from "@angular/core";
import {ProductControlProvidersModule} from "../../product-control-providers.module";
import {SelectProductService} from "./select-product.service";
import {Product} from "../../models/product";

@Injectable({
  providedIn: ProductControlProvidersModule,
  useClass: SelectProductService
})
export abstract class SelectProduct {
  abstract select(product: Product): void;
}
