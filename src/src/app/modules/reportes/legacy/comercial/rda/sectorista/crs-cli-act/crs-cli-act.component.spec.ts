import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrsCliActComponent } from './crs-cli-act.component';

describe('CrsCliActComponent', () => {
  let component: CrsCliActComponent;
  let fixture: ComponentFixture<CrsCliActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrsCliActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrsCliActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
