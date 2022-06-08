/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FavoriteService } from './favorite.service';

describe('Service: Card', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoriteService]
    });
  });

  it('should ...', inject([FavoriteService], (service: FavoriteService) => {
    expect(service).toBeTruthy();
  }));
});
