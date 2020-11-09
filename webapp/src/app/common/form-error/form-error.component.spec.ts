import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormErrorComponent} from './form-error.component';
import {FormErrorContainerComponent} from '../form-error-container/form-error-container.component';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {By} from '@angular/platform-browser';

@Component({
  selector: 'mft-form-error-test',
  template: `
    <mft-form-error-container>
      <mft-form-error [type]="test"></mft-form-error>
    </mft-form-error-container>
  `
})
export class FormErrorTestComponent {
  control = new FormControl();
}

describe('FormErrorComponent', () => {
  let component: FormErrorComponent;
  let fixture: ComponentFixture<FormErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormErrorTestComponent, FormErrorContainerComponent, FormErrorComponent],
      providers: [FormErrorContainerComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorComponent);
    component = fixture.componentInstance;
    component.container.abstractControl = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have access to parent component', function () {
    expect(component.container).toBeDefined();
  });

  it('should project content if control is invalid with provided type', function () {
    expect(component.isInvalid()).toBeFalsy();
    component.type = 'test';
    component.container.abstractControl.setErrors({test: true});
    expect(component.isInvalid()).toBeTruthy();
    expect(fixture.debugElement.query(By.css('invalid-feedback'))).toBeDefined();
  });

  it('should not project content if control is invalid and provided type doesnot match', function () {
    component.container.abstractControl.setErrors({test: true});
    expect(component.isInvalid()).toBeFalsy();
  });

  it('should not display text when container control is valid', function () {
    expect(fixture.debugElement.query(By.css('invalid-feedback'))).toBeNull();
  });
});
