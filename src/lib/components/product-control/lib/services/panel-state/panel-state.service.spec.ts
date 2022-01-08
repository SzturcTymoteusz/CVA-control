import {TestBed} from '@angular/core/testing';

import {PanelStateService} from './panel-state.service';

describe('PanelStateService', () => {
  let service: PanelStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PanelStateService]
    });
    service = TestBed.inject(PanelStateService);
  });

  describe('#open with openState', () => {
    it('after open panel openState should be set on true', (done) => {
      service.open();
      service.openState.subscribe(value => {
        expect(value).toEqual(true);
        done();
      })

    })
  })

  describe('#close with openState', () => {
    it('after close panel openState should be set on false', (done) => {
      service.close();
      service.openState.subscribe(value => {
        expect(value).toEqual(false);
        done();
      })
    })
  })
});
