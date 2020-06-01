import { TestBed } from '@angular/core/testing';

import { DeleteService } from '../shared/delete.service';

describe('ActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteService = TestBed.get(DeleteService);
    expect(service).toBeTruthy();
  });
});
