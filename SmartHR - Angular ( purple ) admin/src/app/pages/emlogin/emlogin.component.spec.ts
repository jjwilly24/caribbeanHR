import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmloginComponent } from './emlogin.component';

describe('EmloginComponent', () => {
  let component: EmloginComponent;
  let fixture: ComponentFixture<EmloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
