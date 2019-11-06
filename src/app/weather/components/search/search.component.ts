import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Weather } from '../../../model/weather';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { selectErrorMessage } from '../../store/selectors/weather';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  @Output() citySearch = new EventEmitter<string>();

  weather: Weather;
  error: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.error = store.select(selectErrorMessage);
  }

  search(city) {
    this.citySearch.emit(city);
  }
}
