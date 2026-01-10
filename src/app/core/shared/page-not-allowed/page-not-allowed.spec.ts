import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotAllowed } from './page-not-allowed';

describe('PageNotAllowed', () => {
  let component: PageNotAllowed;
  let fixture: ComponentFixture<PageNotAllowed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNotAllowed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNotAllowed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
