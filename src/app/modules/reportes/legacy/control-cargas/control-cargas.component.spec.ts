import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCargasComponent } from './control-cargas.component';

describe('ControlCargasComponent', () => {
  let component: ControlCargasComponent;
  let fixture: ComponentFixture<ControlCargasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlCargasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlCargasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
