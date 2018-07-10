import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreHealthComponent } from './restorehealth.component';

describe('AB1Component', () => {
  let component: RestoreHealthComponent;
  let fixture: ComponentFixture<RestoreHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestoreHealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
