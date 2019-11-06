import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AddWeather, HandleWeatherSearchError, SEARCH_WEATHER } from '..';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { WeatherService } from '../../services/weather/weather.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class WeatherEffect {
  @Effect()
  loadWeather$ = this.actions$.pipe(
    ofType(SEARCH_WEATHER),
    mergeMap(action =>
      this.weatherService.searchWeatherForCity(action['payload'])
        .pipe(
          map(weather => new AddWeather(weather)),
          catchError(error => of(new HandleWeatherSearchError(error.error.message)))
        )
    )
  );

  constructor(private actions$: Actions, private weatherService: WeatherService) {}
}
