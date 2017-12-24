import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupTosefetComponent } from './setup-tosefet.component';

describe('SetupTosefetComponent', () => {
  let component: SetupTosefetComponent;
  let fixture: ComponentFixture<SetupTosefetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupTosefetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupTosefetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
