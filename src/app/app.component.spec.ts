import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {By} from "@angular/platform-browser";
import {Component, DebugElement} from "@angular/core";

@Component({
  selector: 'app-form',
  template: ''
})
class FormComponent {
}

describe('AppComponent', () => {
  let fixture!: ComponentFixture<AppComponent>;
  let component!: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, FormComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#appForm', () => {
    let appForm!: DebugElement;

    beforeEach(() => {
      appForm = fixture.debugElement.query(By.css('app-form'));
    })

    it('should be in DOM', () => {
      expect(appForm).toBeTruthy();
    })
  })
});
