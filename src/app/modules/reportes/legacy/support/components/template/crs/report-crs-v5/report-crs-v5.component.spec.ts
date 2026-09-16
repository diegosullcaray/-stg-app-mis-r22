import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportCrsv5Component } from './report-crs-v5.component';
 
describe('ReportCrsV5Component', () => {
  let component: ReportCrsv5Component;
  let fixture: ComponentFixture<ReportCrsV5Component>;

  beforeEach(async(() => { 
    TestBed.configureTestingModule({
      declarations: [ ReportCrsV5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCrsV5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
