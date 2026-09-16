import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCrsV6Component } from './report-crs-v6.component';

describe('ReportCrsV6Component', () => {
  let component: ReportCrsV6Component;
  let fixture: ComponentFixture<ReportCrsV6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCrsV6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCrsV6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
