/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TravelService } from './TravelService.service';

describe('Service: TravelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TravelService]
    });
  });

  it('should ...', inject([TravelService], (service: TravelService) => {
    expect(service).toBeTruthy();
  }));
});
