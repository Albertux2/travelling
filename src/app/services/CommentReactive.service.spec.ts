/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommentReactiveService } from './CommentReactive.service';

describe('Service: CommentReactive', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentReactiveService]
    });
  });

  it('should ...', inject([CommentReactiveService], (service: CommentReactiveService) => {
    expect(service).toBeTruthy();
  }));
});
