import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContentComponent} from './content.component';
import {BehaviorSubject, Observable} from "rxjs";
import {PanelState} from "../../../services/panel-state/panel-state";
import {By} from "@angular/platform-browser";
import {Product} from "../../../models/product";
import {Component, DebugElement, Input} from "@angular/core";

@Component({
  selector: 'app-product',
  template: ''
})
class ProductComponent {
  @Input() product!: Product;
  @Input() disabled!: boolean;
}

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  const dummyProducts: Product[] = [
    {id: 1, name: 'Product 1', description: 'Product 1 - the best'},
    {id: 2, name: 'Product 2', description: 'Product 2 - the best'},
    {id: 3, name: 'Product 3', description: 'Product 3 - the best'},
  ];

  const openStateSubject = new BehaviorSubject(true);
  const openStateObservable = openStateSubject.asObservable();

  let panelStateMock: {
    openState: Observable<boolean>;
  };

  beforeEach(async () => {
    panelStateMock = {
      openState: openStateObservable
    };

    await TestBed.configureTestingModule({
      declarations: [ContentComponent, ProductComponent],
      providers: [{provide: PanelState, useValue: panelStateMock}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    component.products = dummyProducts;
    component.disabled = true;
    fixture.detectChanges();
  });

  describe('#.close', () => {
    it('should be add if panel is close', () => {
      openStateSubject.next(false);
      fixture.detectChanges();

      const closeElement = fixture.debugElement.query(By.css('.close'));
      expect(closeElement).toBeTruthy();
    })
    it('should be add if panel is open', () => {
      openStateSubject.next(true);
      fixture.detectChanges();

      const closeElement = fixture.debugElement.query(By.css('.close'));
      expect(closeElement).toBeNull();
    })
  })

  describe('#products', () => {
    let products!: DebugElement[];
    let productComponents!: ProductComponent[];

    beforeEach(() => {
      products = fixture.debugElement.queryAll(By.css('app-product'));
      productComponents = products.map(product => product.componentInstance);
    })

    it('should be in DOM', () => {
      products.forEach(product => {
        expect(product).toBeTruthy();
      })
    })
    it('should have product property', () => {
      productComponents.forEach((product, index) => {
        expect(product.product).toEqual(dummyProducts[index]);
      })
    })
    it('should have disabled property', () => {
      productComponents.forEach((product) => {
        expect(product.disabled).toEqual(true);
      })
    })
  })
});
