import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductComponent} from './product.component';
import {Product} from "../../../../models/product";
import {By} from "@angular/platform-browser";
import {ProductControlValue} from "../../../../services/product-control-value/product-control-value";
import {SelectProduct} from "../../../../services/select-product/select-product";

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  const product: Product = {
    id: 1,
    name: 'Product 1',
    description: 'Product 1 - the best'
  };
  const productControlName: Product = {
    id: 1,
    name: 'Product 1',
    description: 'Product 1 - the best'
  };

  let productControlValueMock: {
    value: jest.Mock;
  };
  let selectProductMock: {
    select: jest.Mock;
  };

  beforeEach(async () => {
    productControlValueMock = {
      value: jest.fn(),
    };
    Object.defineProperty(productControlValueMock, 'value', {
      get: jest.fn().mockImplementation(() => productControlName),
      configurable: true
    });
    selectProductMock = {
      select: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        {provide: ProductControlValue, useValue: productControlValueMock},
        {provide: SelectProduct, useValue: selectProductMock},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = product;
    component.disabled = false;
    fixture.detectChanges();
  });

  describe('#product name', () => {
    it('should be set', () => {
      const productName = fixture.debugElement.query(By.css('.name')).nativeElement;
      expect(productName.textContent).toEqual(product.name);
    })
  })

  describe('#product tooltip', () => {
    it('should be set', () => {
      const productTooltip = fixture.debugElement.query(By.css('.tooltip')).nativeElement;
      expect(productTooltip.getAttribute('data-tooltip')).toEqual(product.description);
    })
  })

  describe('#active product', () => {
    it('should be active if selected', () => {
      const activeProduct = fixture.debugElement.query(By.css('.active'));
      expect(activeProduct).toBeTruthy();
    })
    it('should not be active if not selected', () => {
      productControlName.id = 3;
      fixture.detectChanges();
      const activeProduct = fixture.debugElement.query(By.css('.active'));
      expect(activeProduct).toBeNull();
    })
  })

  describe('#click on product', () => {
    it('should select new product', () => {
      const productRef = fixture.debugElement.query(By.css('.container')).nativeElement;
      productRef.click();
      expect(selectProductMock.select).toHaveBeenCalledWith(product);
    })
    it('if is disabled should not select new product', () => {
      component.disabled = true;
      fixture.detectChanges();
      const productRef = fixture.debugElement.query(By.css('.container')).nativeElement;
      productRef.click();
      expect(selectProductMock.select).not.toHaveBeenCalled();
    })
  })
});
