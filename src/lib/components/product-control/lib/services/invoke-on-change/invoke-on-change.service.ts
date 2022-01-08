import {Injectable} from '@angular/core';
import {InvokeOnChange} from "./invoke-on-change";
import {Subject} from "rxjs";

@Injectable()
export class InvokeOnChangeService implements InvokeOnChange {
  private invokeSubject = new Subject<boolean>();
  invokeObservable = this.invokeSubject.asObservable();

  invoke() {
    this.invokeSubject.next(true);
  }
}
