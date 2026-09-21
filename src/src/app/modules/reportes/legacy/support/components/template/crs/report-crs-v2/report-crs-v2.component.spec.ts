import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCrsV2Component } from './report-crs-v2.component';

describe('ReportCrsV2Component', () => {
  let component: ReportCrsV2Component;
  let fixture: ComponentFixture<ReportCrsV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCrsV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCrsV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
