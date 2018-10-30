import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarUploadPage } from './avatar-upload.page';

describe('AvatarUploadPage', () => {
  let component: AvatarUploadPage;
  let fixture: ComponentFixture<AvatarUploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarUploadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
