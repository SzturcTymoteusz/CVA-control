import {Injectable} from "@angular/core";
import {PanelStateService} from "./panel-state.service";
import {Observable} from "rxjs";
import {ProductControlProvidersModule} from "../../product-control-providers.module";

@Injectable({
  providedIn: ProductControlProvidersModule,
  useClass: PanelStateService
})
export abstract class PanelState {
  abstract openState: Observable<boolean>

  abstract open(): void;

  abstract close(): void;
}
