import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CraAutTasaComponent } from './cra-aut-tasa.component';

describe('CraAutTasaComponent', () => {
  let component: CraAutTasaComponent;
  let fixture: ComponentFixture<CraAutTasaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CraAutTasaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CraAutTasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
