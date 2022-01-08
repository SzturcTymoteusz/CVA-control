import {TestBed} from '@angular/core/testing';

import {ProductControlValueService} from './product-control-value.service';
import {Product} from "../../models/product";

describe('ProductControlValueService', () => {
  let service: ProductControlValueService;

  const product: Product = {
    id: 1,
    name: 'Product 1',
    description: 'Product 1 - the best'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductControlValueService]
    });
    service = TestBed.inject(ProductControlValueService);
  });

  describe('#setter and getter value', () => {
    it('should return initial value', () => {
      expect(service.value).toEqual({
        id: 0,
        name: '',
        description: ''
      })
    })
    it('should set new product and return it', () => {
      service.value = product;
      expect(service.value).toEqual(product);
    })
  })
});
