import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCrsV1Component } from './report-crs-v1.component';

describe('ReportCrsV1Component', () => {
  let component: ReportCrsV1Component;
  let fixture: ComponentFixture<ReportCrsV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCrsV1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCrsV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
