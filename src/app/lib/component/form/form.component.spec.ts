import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormComponent} from './form.component';
import {Component, DebugElement, Input} from "@angular/core";
import {By} from "@angular/platform-browser";
import {Product} from "../../../../lib/components/product-control";
import {FormConfiguration} from "../../models/form-configuration";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FORM_CONFIGURATION} from "../../config/form-configuration";
import {AppForm} from "../../services/app-form/app-form";
import {NO_ERRORS_SCHEMA} from "@angular/compiler";

@Component({
  selector: 'app-product-control',
  template: ''
})
class ProductControlComponent {
  @Input() label!: string;
  @Input() initialOpenState!: boolean;
  @Input() products!: Product;
  @Input() formControl!: FormControl;
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  const formConfiguration: FormConfiguration = {
    drinks: {
      label: 'Wybierz napój',
      products: [
        {
          id: 1,
          name: 'Coca-cola',
          description: 'Coca-cola - arka napoju gazowanego przedsiębiorstwa The Coca-Cola Company. '
        }
      ]
    },
    snacks: {
      label: 'Wybierz przekąskę',
      products: [
        {
          id: 1,
          name: 'Sałatka gyros',
          description: 'Sałatka gyros to jedna z najpopularniejszych sałatek imprezowych. Ta warstwowa sałatka z podsmażanym kurczakiem i warzywami zawsze wygląda efektownie na sylwestrowym stole.'
        }
      ]
    },
  };
  const appForm = new FormGroup({
    drinks: new FormControl(null),
    snacks: new FormControl({
      id: 1,
      name: 'Sałatka gyros',
      description: 'Sałatka gyros to jedna z najpopularniejszych sałatek imprezowych. Ta warstwowa sałatka z podsmażanym kurczakiem i warzywami zawsze wygląda efektownie na sylwestrowym stole.'
    }),
  })

  let appFormMock: {
    get: jest.Mock;
    drinks: jest.Mock;
    snacks: jest.Mock;
  };

  beforeEach(async () => {
    appFormMock = {
      get: jest.fn().mockImplementation(() => appForm),
      drinks: jest.fn(),
      snacks: jest.fn(),
    };
    Object.defineProperty(appFormMock, 'snacks', {
      get: jest.fn().mockImplementation(() => appForm.get('snacks')),
      configurable: true
    });
    Object.defineProperty(appFormMock, 'drinks', {
      get: jest.fn().mockImplementation(() => appForm.get('drinks')),
      configurable: true
    });

    await TestBed.configureTestingModule({
      declarations: [FormComponent, ProductControlComponent],
      providers: [
        {provide: FORM_CONFIGURATION, useValue: formConfiguration},
        {provide: AppForm, useValue: appFormMock},
      ],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#drinks FormControl', () => {
    let drinksControl!: DebugElement;
    let drinksControlComponent!: ProductControlComponent;

    beforeEach(() => {
      drinksControl = fixture.debugElement.queryAll(By.css('app-product-control'))[0];
      drinksControlComponent = drinksControl.componentInstance;
    })

    it('should be in DOM', () => {
      expect(drinksControl).toBeTruthy();
    })
    it('should have label property', () => {
      expect(drinksControlComponent.label).toBe(formConfiguration.drinks.label);
    })
    it('should have initialOpenState property', () => {
      expect(drinksControlComponent.initialOpenState).toBe(appForm.get('drinks')?.value === null);
    })
    it('should have formControl property', () => {
      expect(drinksControlComponent.formControl).toBe(appForm.get('drinks'));
    })
    it('should have product property', () => {
      expect(drinksControlComponent.products).toBe(formConfiguration.drinks.products);
    })
  })

  describe('#snacks FormControl', () => {
    let snacksControl!: DebugElement;
    let snacksControlComponent!: ProductControlComponent;

    beforeEach(() => {
      snacksControl = fixture.debugElement.queryAll(By.css('app-product-control'))[1];
      snacksControlComponent = snacksControl.componentInstance;
    })

    it('should be in DOM', () => {
      expect(snacksControl).toBeTruthy();
    })
    it('should have label property', () => {
      expect(snacksControlComponent.label).toBe(formConfiguration.snacks.label);
    })
    it('should have initialOpenState property', () => {
      expect(snacksControlComponent.initialOpenState).toBe(appForm.get('snacks')?.value === null);
    })
    it('should have formControl property', () => {
      expect(snacksControlComponent.formControl).toBe(appForm.get('snacks'));
    })
    it('should have product property', () => {
      expect(snacksControlComponent.products).toBe(formConfiguration.snacks.products);
    })
  })
});
