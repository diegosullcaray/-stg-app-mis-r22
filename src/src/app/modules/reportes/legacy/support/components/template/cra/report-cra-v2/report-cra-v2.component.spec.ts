import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCraV2Component } from './report-cra-v2.component';

describe('ReportCraV2Component', () => {
  let component: ReportCraV2Component;
  let fixture: ComponentFixture<ReportCraV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCraV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCraV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
