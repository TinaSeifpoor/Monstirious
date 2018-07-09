import { TestBed, inject } from '@angular/core/testing';

import { HealthPointService } from './healthpoint.service';

describe('HpServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HealthPointService]
    });
  });

  it('should be created', inject([HealthPointService], (service: HealthPointService) => {
    expect(service).toBeTruthy();
  }));
});
