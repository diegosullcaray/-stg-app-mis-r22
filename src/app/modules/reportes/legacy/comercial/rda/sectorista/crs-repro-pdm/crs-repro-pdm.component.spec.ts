import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrsReproPdmComponent } from './crs-repro-pdm.component';

describe('CrsReproPdmComponent', () => {
  let component: CrsReproPdmComponent;
  let fixture: ComponentFixture<CrsReproPdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrsReproPdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrsReproPdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
