import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AB1Component } from './ab1.component';

describe('AB1Component', () => {
  let component: AB1Component;
  let fixture: ComponentFixture<AB1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AB1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AB1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
