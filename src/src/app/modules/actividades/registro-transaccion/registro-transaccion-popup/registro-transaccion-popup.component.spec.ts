import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroTransaccionPopupComponent } from './registro-transaccion-popup.component';


describe('RegistroTransaccionPopupComponent', () => {
  let component: RegistroTransaccionPopupComponent;
  let fixture: ComponentFixture<RegistroTransaccionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroTransaccionPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroTransaccionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
