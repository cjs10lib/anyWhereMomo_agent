import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountStatusPage } from './account-status.page';

describe('AccountStatusPage', () => {
  let component: AccountStatusPage;
  let fixture: ComponentFixture<AccountStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
