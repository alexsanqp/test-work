import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusPaginationComponent } from './plus-pagination.component';

describe('PlusPaginationComponent', () => {
  let component: PlusPaginationComponent;
  let fixture: ComponentFixture<PlusPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlusPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlusPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
