import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupFolderComponent } from './setup-folder.component';

describe('SetupFolderComponent', () => {
  let component: SetupFolderComponent;
  let fixture: ComponentFixture<SetupFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
