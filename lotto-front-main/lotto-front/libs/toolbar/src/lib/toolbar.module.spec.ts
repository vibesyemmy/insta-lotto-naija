import { async, TestBed } from '@angular/core/testing';
import { ToolbarModule } from './toolbar.module';

describe('ToolbarModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ToolbarModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ToolbarModule).toBeDefined();
  });
});
