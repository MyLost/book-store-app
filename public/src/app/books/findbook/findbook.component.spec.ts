import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinBookComponent } from './findbook.component';

describe('FindbookComponent', () => {
  let component: FinBookComponent;
  let fixture: ComponentFixture<FinBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
