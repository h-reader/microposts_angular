import { TestBed, inject } from '@angular/core/testing';

import { MicropostService } from './micropost.service';

describe('MicropostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MicropostService]
    });
  });

  it('should be created', inject([MicropostService], (service: MicropostService) => {
    expect(service).toBeTruthy();
  }));
});
