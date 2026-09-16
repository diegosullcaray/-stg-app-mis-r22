import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSecComponent } from './search-sec.component';

describe('SearchSecComponent', () => {
  let component: SearchSecComponent;
  let fixture: ComponentFixture<SearchSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
