import { TestBed } from '@angular/core/testing';

import { BaseService } from './common/base.service';

describe('BaseService', () => {
  let service: BaseService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
