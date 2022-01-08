import {Component, Input} from '@angular/core';
import {PanelState} from "../../../services/panel-state/panel-state";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  @Input() products!: Product[];
  @Input() disabled!: boolean;

  constructor(public panelState: PanelState) {
  }
}
