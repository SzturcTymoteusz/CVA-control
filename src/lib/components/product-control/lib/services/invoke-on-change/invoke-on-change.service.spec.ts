import {TestBed} from '@angular/core/testing';

import {InvokeOnChangeService} from './invoke-on-change.service';

describe('InvokeOnChangeService', () => {
  let service: InvokeOnChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvokeOnChangeService]
    });
    service = TestBed.inject(InvokeOnChangeService);
  });

  describe('#invokeObservable and invoke', () => {
    it('should emit new value on observable if invoked', (done) => {
      service.invokeObservable.subscribe(ret => {
        expect(ret).toBeTruthy();
        done();
      })
      service.invoke();
    })
  })
});
