import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrsProspeComponent } from './crs-prospe.component';

describe('CrsProspeComponent', () => {
  let component: CrsProspeComponent;
  let fixture: ComponentFixture<CrsProspeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrsProspeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrsProspeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
