import { TestBed } from '@angular/core/testing';

import { AdminPo } from './admin-po';

describe('AdminPo', () => {
  let service: AdminPo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
