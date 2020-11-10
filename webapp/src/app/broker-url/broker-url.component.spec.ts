import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerUrlComponent } from './broker-url.component';

describe('BrokerUrlComponent', () => {
  let component: BrokerUrlComponent;
  let fixture: ComponentFixture<BrokerUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
