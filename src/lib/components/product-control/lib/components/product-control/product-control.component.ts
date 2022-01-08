import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PanelState} from "../../services/panel-state/panel-state";
import {PanelStateService} from "../../services/panel-state/panel-state.service";
import {Product} from "../../models/product";
import {ProductControlValue} from "../../services/product-control-value/product-control-value";
import {ProductControlValueService} from "../../services/product-control-value/product-control-value.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {InvokeOnChange} from "../../services/invoke-on-change/invoke-on-change";
import {InvokeOnChangeService} from "../../services/invoke-on-change/invoke-on-change.service";
import {SelectProduct} from "../../services/select-product/select-product";
import {SelectProductService} from "../../services/select-product/select-product.service";

@Component({
  selector: 'app-product-control',
  templateUrl: './product-control.component.html',
  styleUrls: ['./product-control.component.scss'],
  providers: [
    {provide: PanelState, useClass: PanelStateService},
    {provide: ProductControlValue, useClass: ProductControlValueService},
    {provide: InvokeOnChange, useClass: InvokeOnChangeService},
    {provide: SelectProduct, useClass: SelectProductService},
    {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: ProductControlComponent}
  ]
})
export class ProductControlComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() label!: string;
  @Input() initialOpenState!: boolean;
  @Input() products!: Product[];

  onChange = (_product: Product) => {
  };
  onTouched = () => {
  };

  touched = false;

  disabled = false;

  private destroySubject = new Subject<boolean>();


  constructor(
    public panelState: PanelState,
    private productControlValue: ProductControlValue,
    private invokeOnChange: InvokeOnChange
  ) {
  }

  ngOnInit(): void {
    this.setInitialValue();
  }

  writeValue(product: Product | null) {
    if (product) {
      this.productControlValue.value = product;
    }
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }


  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  ngOnDestroy() {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }

  private setInitialValue() {
    if (this.initialOpenState !== undefined) {
      this.initialOpenState ? this.panelState.open() : this.panelState.close()
    }
    this.invokeOnChange.invokeObservable.pipe(takeUntil(this.destroySubject)).subscribe(() => {
      this.markAsTouched();
      this.onChange(this.productControlValue.value);
    })
  }
}
