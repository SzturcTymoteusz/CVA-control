import {Injectable} from "@angular/core";
import {ProductControlProvidersModule} from "../../product-control-providers.module";
import {InvokeOnChangeService} from "./invoke-on-change.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: ProductControlProvidersModule,
  useClass: InvokeOnChangeService
})
export abstract class InvokeOnChange {
  abstract invokeObservable: Observable<unknown>;

  abstract invoke(): void;
}
