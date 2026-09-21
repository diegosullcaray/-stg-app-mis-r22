import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteSecPropComponent } from './auto-complete-sec-prop.component';

describe('AutoCompleteSecPropComponent', () => {
  let component: AutoCompleteSecPropComponent;
  let fixture: ComponentFixture<AutoCompleteSecPropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompleteSecPropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteSecPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
