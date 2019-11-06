import { WeatherEffect } from './weather';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { WeatherService } from '../../services/weather/weather.service';
import { AddWeather, SearchWeather } from '..';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { of } from 'rxjs/observable/of';

describe('Weather Effect', () => {
  let effects: WeatherEffect;
  let actions: ReplaySubject<any>;
  const weatherService = jasmine.createSpyObj('WeatherService', ['searchWeatherForCity']);
  const mockWeather = {city: {id: 12345, name: 'Liverpool'}};
  let searchWeatherSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        WeatherEffect,
        provideMockActions(() => actions),
        {provide: WeatherService, useValue: weatherService}
      ]
    });
    effects = TestBed.get(WeatherEffect);
    searchWeatherSpy = weatherService.searchWeatherForCity.and.returnValue(of(mockWeather));
    searchWeatherSpy.calls.reset();
  });

  it('loadWeather should call AddWeather action with expected payload', async () => {
    actions = new ReplaySubject(1);
    const loadWeatherAction = new SearchWeather(mockWeather.city.name);
    actions.next(loadWeatherAction);
    effects.loadWeather$.subscribe((result: AddWeather) => {
      expect(result.payload).toEqual(mockWeather);
    });
  });

  it('loadWeather should call weatherService with expected payload', async () => {
    actions = new ReplaySubject(1);
    const loadWeatherAction = new SearchWeather(mockWeather.city.name);
    actions.next(loadWeatherAction);
    effects.loadWeather$.subscribe((result: AddWeather) => {
      expect(searchWeatherSpy).toHaveBeenCalledWith(mockWeather.city.name);
    });
  });

  it('loadWeather should call weatherService once', async () => {
    actions = new ReplaySubject(1);
    const loadWeatherAction = new SearchWeather(mockWeather.city.name);
    actions.next(loadWeatherAction);
    expect(searchWeatherSpy).toHaveBeenCalledTimes(0);
    effects.loadWeather$.subscribe((result: AddWeather) => {
      expect(searchWeatherSpy).toHaveBeenCalledTimes(1);
    });
  });
});
