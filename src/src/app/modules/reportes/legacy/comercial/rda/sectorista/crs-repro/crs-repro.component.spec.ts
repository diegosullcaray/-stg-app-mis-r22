import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrsReproComponent } from './crs-repro.component';

describe('CrsReproComponent', () => {
  let component: CrsReproComponent;
  let fixture: ComponentFixture<CrsReproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrsReproComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrsReproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
