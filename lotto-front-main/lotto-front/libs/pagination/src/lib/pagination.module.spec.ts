import { async, TestBed } from '@angular/core/testing';
import { PaginationModule } from './pagination.module';

describe('PaginationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PaginationModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PaginationModule).toBeDefined();
  });
});
