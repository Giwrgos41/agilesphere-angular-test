import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Weather } from '../model/weather';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { SearchWeather } from './store';
import { selectWeatherList } from './store/selectors/weather';

@Component({
  selector: 'app-weather',
  template: `
  <app-search (citySearch)="citySearch($event)"></app-search>
  <app-results [weatherResultsList]="this.weatherResultsList | async"></app-results>  `
})
export class WeatherContainerComponent {
  weatherResultsList: Observable<Weather[]>;

  constructor(private store: Store<AppState>) {
    this.weatherResultsList = store.select(selectWeatherList);
  }

  citySearch(event) {
    this.store.dispatch(new SearchWeather(event));
  }
}
