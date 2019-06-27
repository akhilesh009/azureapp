import { TestBed, inject } from '@angular/core/testing';

import { GetTimeseriesDataService } from './get-timeseries-data.service';

describe('GetTimeseriesDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetTimeseriesDataService]
    });
  });

  it('should be created', inject([GetTimeseriesDataService], (service: GetTimeseriesDataService) => {
    expect(service).toBeTruthy();
  }));
});
