import {TestBed} from '@angular/core/testing';

import {AppFormService} from './app-form.service';
import {FormControl, FormGroup} from "@angular/forms";

describe('AppFormService', () => {
  let service: AppFormService;

  const mockForm = new FormGroup({
    drinks: new FormControl(null),
    snacks: new FormControl({
      id: 5,
      name: 'Krążki cebulowe',
      description: 'Domowe krążki cebulowe to niezwykle prosta i super pyszna przekąska na każdą okazję.'
    })
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppFormService]
    });
    service = TestBed.inject(AppFormService);
  });

  describe('get', () => {
    it('should return form', () => {
      expect(service.get().value).toEqual(mockForm.value);
    })
  })

  describe('#drinks', () => {
    it('should return correct formControl', () => {
      expect(service.drinks.value).toEqual(mockForm.get('drinks')?.value)
    })
  })

  describe('#snacks', () => {
    it('should return correct formControl', () => {
      expect(service.snacks.value).toEqual(mockForm.get('snacks')?.value)
    })
  })
});
