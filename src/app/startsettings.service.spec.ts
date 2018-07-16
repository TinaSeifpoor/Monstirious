import { TestBed, inject } from '@angular/core/testing';

import { StartsettingsService } from './startsettings.service';

describe('StartsettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StartsettingsService]
    });
  });

  it('should be created', inject([StartsettingsService], (service: StartsettingsService) => {
    expect(service).toBeTruthy();
  }));
});
