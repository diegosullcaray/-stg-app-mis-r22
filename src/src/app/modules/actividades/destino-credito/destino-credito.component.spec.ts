import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoCreditoComponent } from './destino-credito.component';

describe('DestinoCreditoComponent', () => {
  let component: DestinoCreditoComponent;
  let fixture: ComponentFixture<DestinoCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinoCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinoCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
