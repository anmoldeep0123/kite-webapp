import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgForm} from '@angular/forms';

@Component({
  selector: 'app-form-error-container',
  templateUrl: './form-error-container.component.html',
  styleUrls: ['./form-error-container.component.scss']
})
export class FormErrorContainerComponent implements OnInit {
  @Input() control?: FormControl;
  @Input() group?: FormGroup;
  @Input() form?: NgForm;
  @Input() formDirtyCheck ? = false;
  public abstractControl: AbstractControl = new FormControl();

  ngOnInit(): void {
    this.abstractControl = this.control ? this.control : this.group;
  }

  isInvalid() {
    if (this.form && this.form.submitted) {
      return this.abstractControl.invalid;
    }
    if (this.formDirtyCheck) {
      return this.abstractControl.invalid;
    } else {
      return this.abstractControl.dirty && this.abstractControl.invalid;
    }
  }
}
