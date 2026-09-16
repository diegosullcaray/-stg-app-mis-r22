import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCrsV4Component } from './report-crs-v4.component';

describe('ReportCrsV4Component', () => {
  let component: ReportCrsV4Component;
  let fixture: ComponentFixture<ReportCrsV4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCrsV4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCrsV4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
