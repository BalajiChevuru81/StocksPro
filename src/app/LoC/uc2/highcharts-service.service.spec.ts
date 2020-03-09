import { TestBed } from '@angular/core/testing';
import { HighchartsService } from './highcharts-service.service';

describe('HighchartsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HighchartsService = TestBed.get(HighchartsService);
    expect(service).toBeTruthy();
  });
});
