import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteSecComponent } from './auto-complete-sec.component';

describe('AutoCompleteSecComponent', () => {
  let component: AutoCompleteSecComponent;
  let fixture: ComponentFixture<AutoCompleteSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompleteSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
