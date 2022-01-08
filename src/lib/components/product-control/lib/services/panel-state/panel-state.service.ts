import {Injectable} from '@angular/core';
import {PanelState} from "./panel-state";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class PanelStateService implements PanelState {
  private panelOpenStateSubject = new BehaviorSubject(true);
  openState = this.panelOpenStateSubject.asObservable();

  open() {
    this.panelOpenStateSubject.next(true);
  }

  close() {
    this.panelOpenStateSubject.next(false);
  }

}
