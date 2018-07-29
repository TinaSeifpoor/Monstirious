import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreathandblinkComponent } from './breathandblink.component';

describe('BreathandblinkComponent', () => {
  let component: BreathandblinkComponent;
  let fixture: ComponentFixture<BreathandblinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreathandblinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreathandblinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
