import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../../app.state';

export const selectWeatherState = createFeatureSelector<AppState>('weather');

export const selectWeatherList = createSelector(selectWeatherState, state => {
  if (state.weather) {
    return state.weather;
  }
});

export const selectErrorMessage = createSelector(selectWeatherState, state => {
  return state.errorMessage;
});
