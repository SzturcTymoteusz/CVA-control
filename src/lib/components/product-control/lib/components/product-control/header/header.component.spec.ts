import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {PanelState} from "../../../services/panel-state/panel-state";
import {BehaviorSubject, Observable} from "rxjs";
import {By} from "@angular/platform-browser";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const openStateSubject = new BehaviorSubject(true);
  const openStateObservable = openStateSubject.asObservable();
  const label = 'Label';

  let panelStateMock: {
    openState: Observable<boolean>;
    open: jest.Mock;
    close: jest.Mock;
  }

  beforeEach(async () => {
    panelStateMock = {
      openState: openStateObservable,
      open: jest.fn(),
      close: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{provide: PanelState, useValue: panelStateMock}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.label = label;
    fixture.detectChanges();
  });

  describe('#title', () => {
    it('should be in DOM', () => {
      const title = fixture.debugElement.query((By.css('.title')));
      expect(title).toBeTruthy();
    })
    it('should have correct value', () => {
      const title = fixture.debugElement.query((By.css('.title'))).nativeElement;
      expect(title.textContent).toEqual(label);
    })
  })

  describe('#arrow up', () => {
    beforeEach(() => {
      openStateSubject.next(true);
      fixture.detectChanges();
    })

    it('should be in DOM', () => {
      const arrowUp = fixture.debugElement.query((By.css('.fa-chevron-up')));
      expect(arrowUp).toBeTruthy();
    })
    it('#after click should close panel', () => {
      const arrowUp = fixture.debugElement.query((By.css('.fa-chevron-up'))).nativeElement;
      arrowUp.click();
      expect(panelStateMock.close).toHaveBeenCalled();
    })
  })

  describe('#arrow down', () => {
    beforeEach(() => {
      openStateSubject.next(false);
      fixture.detectChanges();
    })

    it('should be in DOM', () => {
      const arrowDown = fixture.debugElement.query((By.css('.fa-chevron-down')));
      expect(arrowDown).toBeTruthy();
    })
    it('#after click should open panel', () => {
      const arrowDown = fixture.debugElement.query((By.css('.fa-chevron-down'))).nativeElement;
      arrowDown.click();
      expect(panelStateMock.open).toHaveBeenCalled();
    })
  })
});
