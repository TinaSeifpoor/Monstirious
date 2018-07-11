import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DikshuaComponent } from './dikshua.component';

describe('DikshuaComponent', () => {
  let component: DikshuaComponent;
  let fixture: ComponentFixture<DikshuaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DikshuaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DikshuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
