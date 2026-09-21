import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCrsV3Component } from './report-crs-v3.component';

describe('ReportCrsV3Component', () => {
  let component: ReportCrsV3Component;
  let fixture: ComponentFixture<ReportCrsV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCrsV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCrsV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
