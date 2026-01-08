import { TestBed } from '@angular/core/testing';

import { AdminWarehouse } from './admin-warehouse';

describe('AdminWarehouse', () => {
  let service: AdminWarehouse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminWarehouse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
