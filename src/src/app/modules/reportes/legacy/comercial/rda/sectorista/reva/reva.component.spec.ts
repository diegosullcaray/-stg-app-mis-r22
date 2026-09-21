import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevaComponent } from './reva.component';

describe('RevaComponent', () => {
  let component: RevaComponent;
  let fixture: ComponentFixture<RevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
