import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCraV3Component } from './report-cra-v3.component';

describe('ReportCraV3Component', () => {
  let component: ReportCraV3Component;
  let fixture: ComponentFixture<ReportCraV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCraV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCraV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
