import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrsCapRetComponent } from './crs-cap-ret.component';

describe('CrsCapRetComponent', () => {
  let component: CrsCapRetComponent;
  let fixture: ComponentFixture<CrsCapRetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrsCapRetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrsCapRetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
