import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductControlComponent} from './product-control.component';
import {Component, DebugElement, Input} from "@angular/core";
import {By} from "@angular/platform-browser";
import {PanelState} from "../../services/panel-state/panel-state";
import {Product} from "../../models/product";
import {ProductControlValue} from "../../services/product-control-value/product-control-value";
import {Observable, Subject} from "rxjs";
import {InvokeOnChange} from "../../services/invoke-on-change/invoke-on-change";
import {SelectProduct} from "../../services/select-product/select-product";

@Component({
  selector: 'app-header',
  template: ''
})
class HeaderComponent {
  @Input() label!: string;
}

@Component({
  selector: 'app-content',
  template: ''
})
class ContentComponent {
  @Input() products!: Product[];
  @Input() disabled!: boolean;
}

describe('ProductControlComponent', () => {
  let component: ProductControlComponent;
  let fixture: ComponentFixture<ProductControlComponent>;

  const label = 'Label';
  const products: Product[] = [{id: 1, name: 'Product 1', description: 'Product 1 - the best'}]
  const productValue: Product = {id: 1, name: 'Product 1', description: 'Product 1 - the best'};
  const valueSetter = jest.fn();
  const invokeSubject = new Subject();
  const invokeObservable = invokeSubject.asObservable();

  let panelStateMock: {
    open: jest.Mock;
    close: jest.Mock;
  };
  let productControlValueMock: {
    value: jest.Mock;
  };
  let invokeOnChangeServiceMock: {
    invokeObservable: Observable<unknown>;
  };
  let selectProductServiceMock: {
    select: jest.Mock;
  };

  beforeEach(async () => {
    panelStateMock = {
      open: jest.fn(),
      close: jest.fn()
    };
    productControlValueMock = {
      value: jest.fn(),
    };
    Object.defineProperty(productControlValueMock, 'value', {
      get: jest.fn().mockImplementation(() => productValue),
      set: valueSetter,
      configurable: true
    });
    invokeOnChangeServiceMock = {
      invokeObservable: invokeObservable,
    };
    selectProductServiceMock = {
      select: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [ProductControlComponent, HeaderComponent, ContentComponent],
      providers: [
        {provide: PanelState, useValue: panelStateMock},
        {provide: ProductControlValue, useValue: productControlValueMock},
        {provide: InvokeOnChange, useValue: invokeOnChangeServiceMock},
        {provide: SelectProduct, useValue: selectProductServiceMock},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    TestBed.overrideComponent(ProductControlComponent, {
      set: {
        providers: [
          {
            provide: PanelState,
            useValue: panelStateMock
          },
          {
            provide: ProductControlValue,
            useValue: productControlValueMock
          },
          {
            provide: InvokeOnChange,
            useValue: invokeOnChangeServiceMock
          },
          {
            provide: SelectProduct,
            useValue: selectProductServiceMock
          },
        ]
      }
    });
    fixture = TestBed.createComponent(ProductControlComponent);
    component = fixture.componentInstance;
    component.label = label;
    component.products = products;
    fixture.detectChanges();
  });

  describe('#ngOnInit', () => {
    it('should set panel state if was given', () => {
      component.ngOnInit();
      expect(panelStateMock.open).not.toHaveBeenCalled();
      expect(panelStateMock.close).not.toHaveBeenCalled();

      component.initialOpenState = true;
      fixture.detectChanges();
      component.ngOnInit();
      expect(panelStateMock.open).toHaveBeenCalled();

      component.initialOpenState = false;
      fixture.detectChanges();
      component.ngOnInit();
      expect(panelStateMock.close).toHaveBeenCalled();
    })
    it('should subscribe to invokeObservable', () => {
      jest.spyOn(component, 'markAsTouched');
      jest.spyOn(component, 'onChange');
      invokeSubject.next(false);
      expect(component.markAsTouched).toHaveBeenCalled();
      expect(component.onChange).toHaveBeenCalledWith(productValue);
    })
  })

  describe('#header', () => {
    let header!: DebugElement;
    let headerComponent!: ProductControlComponent;

    beforeEach(() => {
      header = fixture.debugElement.query(By.css('app-header'));
      headerComponent = header.componentInstance;
    })

    it('should be in DOM', () => {
      expect(header).toBeTruthy();
    })
    it('should have label property', () => {
      expect(headerComponent.label).toEqual(component.label);
    })
  })

  describe('#content', () => {
    let content!: DebugElement;
    let contentComponent!: ProductControlComponent;

    beforeEach(() => {
      content = fixture.debugElement.query(By.css('app-content'));
      contentComponent = content.componentInstance;
    })

    it('should be in DOM', () => {
      expect(content).toBeTruthy();
    })
    it('should have products property', () => {
      expect(contentComponent.products).toEqual(products);
    })
    it('should have disabled property', () => {
      expect(contentComponent.disabled).toEqual(component.disabled);
    })
  })

  describe('#writeValue', () => {
    it('should not set value if passed null', () => {
      component.writeValue(null);
      expect(valueSetter).not.toHaveBeenCalled();
    })
    it('should set value if passed product', () => {
      component.writeValue(productValue);
      expect(valueSetter).toHaveBeenCalledWith(productValue);
    })
  })

  describe('#markAsTouched', () => {
    it('should call onTouched callback and set touched to true', () => {
      jest.spyOn(component, 'onTouched');
      component.markAsTouched();
      expect(component.touched).toEqual(true);
      expect(component.onTouched).toHaveBeenCalled();
    })
    it('should not call onTouched callback and set touched to true if touched', () => {
      component.touched = true;
      jest.spyOn(component, 'onTouched');
      component.markAsTouched();
      expect(component.touched).toEqual(true);
      expect(component.onTouched).not.toHaveBeenCalled();
    })
  })

  describe('#registerOnChange', () => {
    it('should set onChange', () => {
      const callback = () => {};
      component.registerOnChange(callback);
      expect(component.onChange).toEqual(callback);
    })
  })

  describe('#registerOnTouched', () => {
    it('should set onTouched', () => {
      const callback = () => {};
      component.registerOnTouched(callback);
      expect(component.onTouched).toEqual(callback);
    })
  })

  describe('#setDisabledState', () => {
    it('should set disabled', () => {
      component.setDisabledState(false);
      expect(component.disabled).toEqual(false);
    })
  })
});
