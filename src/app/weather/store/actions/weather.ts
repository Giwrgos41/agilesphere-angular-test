import { Action } from '@ngrx/store';
import { Weather} from '../../../model/weather';

export const ADD_WEATHER = '[WEATHER] Add';
export const SEARCH_WEATHER = '[WEATHER] Search';
export const HANDLE_WEATHER_SEARCH_ERROR = '[WEATHER] Error';

export class AddWeather implements Action {
  readonly type = ADD_WEATHER;

  constructor(public payload: Weather) {}
}

export class SearchWeather implements Action {
  readonly type = SEARCH_WEATHER;

  constructor(public payload: string) {}
}

export class HandleWeatherSearchError implements Action {
  readonly type = HANDLE_WEATHER_SEARCH_ERROR;

  constructor(public payload: string) {}
}

export type Actions = AddWeather | SearchWeather | HandleWeatherSearchError;
