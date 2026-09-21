import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CraSegAseComponent } from './cra-seg-ase.component';

describe('CraSegAseComponent', () => {
  let component: CraSegAseComponent;
  let fixture: ComponentFixture<CraSegAseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CraSegAseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CraSegAseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
