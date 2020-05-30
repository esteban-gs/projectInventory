import { TestBed } from '@angular/core/testing';

import { CategoryHttpServiceService } from './category-http-service.service';

describe('CategoryHttpServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryHttpServiceService = TestBed.get(CategoryHttpServiceService);
    expect(service).toBeTruthy();
  });
});
