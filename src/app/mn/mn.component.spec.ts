import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MNComponent } from './mn.component';

describe('MNComponent', () => {
  let component: MNComponent;
  let fixture: ComponentFixture<MNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
