import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperpunchComponent } from './superpunch.component';

describe('SuperpunchComponent', () => {
  let component: SuperpunchComponent;
  let fixture: ComponentFixture<SuperpunchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperpunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperpunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
