import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KickComponent } from './cardholder2.component';

describe('KickComponent', () => {
  let component: KickComponent;
  let fixture: ComponentFixture<KickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
