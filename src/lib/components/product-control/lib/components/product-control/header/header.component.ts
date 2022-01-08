import {Component, Input} from '@angular/core';
import {PanelState} from "../../../services/panel-state/panel-state";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() label!: string

  constructor(public panelState: PanelState) {
  }
}
