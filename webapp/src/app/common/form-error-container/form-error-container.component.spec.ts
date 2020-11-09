import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormErrorContainerComponent} from './form-error-container.component';
import {FormControl} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('FormErrorContainerComponent', () => {
  let component: FormErrorContainerComponent;
  let fixture: ComponentFixture<FormErrorContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormErrorContainerComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorContainerComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render project content when form is dirty and invalid', function () {
    component.abstractControl.markAsDirty();
    component.abstractControl.setErrors({'incorrect': true});
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('div'))).toBeDefined();
  });

  it('should not render project content when form is pristine', function () {
    expect(fixture.debugElement.query(By.css('div'))).toBeNull();
  });
});
