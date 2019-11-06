import { WeatherService } from './weather.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('WeatherService', () => {
  let weatherService: WeatherService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    weatherService = TestBed.get(WeatherService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(weatherService).toBeTruthy();
  });

  describe('#searchWeatherForCity', () => {
    it('should return expected response and call weather api once', () => {
      const expectedResponse = { city: 'Liverpool', temp: 12.5 };
      const city =  'Liverpool';

      weatherService.searchWeatherForCity(city).subscribe(
        result => expect(result).toEqual(expectedResponse));

      const req = httpTestingController.expectOne((http: HttpRequest<any>) => {
        return (
          http.urlWithParams.startsWith(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=8&units=metric`
          ) &&
          http.method === 'GET' &&
          http.params.get('q') === city &&
          http.params.get('cnt') === '8' &&
          http.params.get('units') === 'metric' &&
          http.params.get('APPID') === '010721642521f31b0fbc8c3831d45951'
        );
      });
      req.flush(expectedResponse);
    });
  });
});
