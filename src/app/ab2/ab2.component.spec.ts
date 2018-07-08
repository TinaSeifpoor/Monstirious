import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AB2Component } from './ab2.component';

describe('AB2Component', () => {
  let component: AB2Component;
  let fixture: ComponentFixture<AB2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AB2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AB2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
