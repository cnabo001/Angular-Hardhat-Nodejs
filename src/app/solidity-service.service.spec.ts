import { TestBed } from '@angular/core/testing';

import { SolidityServiceService } from './solidity-service.service';

describe('SolidityServiceService', () => {
  let service: SolidityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolidityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
