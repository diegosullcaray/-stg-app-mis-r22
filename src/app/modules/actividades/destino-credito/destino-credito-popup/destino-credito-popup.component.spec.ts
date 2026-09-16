import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoCreditoPopupComponent } from './destino-credito-popup.component';

describe('DestinoCreditoPopupComponent', () => {
  let component: DestinoCreditoPopupComponent;
  let fixture: ComponentFixture<DestinoCreditoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinoCreditoPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinoCreditoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
