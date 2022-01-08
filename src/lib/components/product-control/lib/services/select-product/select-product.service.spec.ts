import {TestBed} from '@angular/core/testing';

import {SelectProductService} from './select-product.service';
import {ProductControlValue} from "../product-control-value/product-control-value";
import {InvokeOnChange} from "../invoke-on-change/invoke-on-change";
import {Product} from "../../models/product";

describe('SelectProductService', () => {
  let service: SelectProductService;

  const product: Product = {
    id: 1,
    name: 'Product 1',
    description: 'Product 1 - the best'
  };

  let productControlValueMock: {
    value: jest.Mock;
  };
  let invokeOnChangeMock: {
    invoke: jest.Mock;
  };

  const valueSetter = jest.fn();

  beforeEach(() => {
    productControlValueMock = {
      value: jest.fn(),
    };
    Object.defineProperty(productControlValueMock, 'value', {
      set: valueSetter,
      configurable: true
    });
    invokeOnChangeMock = {
      invoke: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        SelectProductService,
        {provide: ProductControlValue, useValue: productControlValueMock},
        {provide: InvokeOnChange, useValue: invokeOnChangeMock}
      ]
    });
    service = TestBed.inject(SelectProductService);
  });

  describe('#select', () => {
    it('should save selected product', () => {
      service.select(product);
      expect(valueSetter).toHaveBeenCalledWith(product);
    })
    it('should invoke onChange callback to notify parent form that a new value is available', () => {
      service.select(product);
      expect(invokeOnChangeMock.invoke).toHaveBeenCalled();
    })
  })
});
