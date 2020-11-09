import {Component, Input} from '@angular/core';
import {FormErrorContainerComponent} from '../form-error-container/form-error-container.component';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent {
  @Input() type: string;
  container: FormErrorContainerComponent;

  constructor(container: FormErrorContainerComponent) {
    this.container = container;
  }

  isInvalid() {
    return this.container.abstractControl.errors && this.container.abstractControl.errors[this.type];
  }
}
