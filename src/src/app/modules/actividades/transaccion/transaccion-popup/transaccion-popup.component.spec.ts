import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransaccionPopupComponent } from './transaccion-popup.component';


describe('TransaccionPopupComponent', () => {
  let component: TransaccionPopupComponent;
  let fixture: ComponentFixture<TransaccionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransaccionPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaccionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
