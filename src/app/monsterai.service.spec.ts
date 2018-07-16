import { TestBed, inject } from '@angular/core/testing';

import { MonsteraiService } from './monsterai.service';

describe('MonsteraiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonsteraiService]
    });
  });

  it('should be created', inject([MonsteraiService], (service: MonsteraiService) => {
    expect(service).toBeTruthy();
  }));
});
