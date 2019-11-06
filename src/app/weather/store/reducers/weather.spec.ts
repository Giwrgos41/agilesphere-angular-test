import { weatherReducer } from './weather';
import { AddWeather, HandleWeatherSearchError, SearchWeather } from '..';
import { AppState } from '../../../app.state';
import { Weather } from '../../../model/weather';

describe('Weather reducer', () => {
  const initialState = {
    weather: [],
    errorMessage: ''
  };

  it('weatherReducer should add payload in state for AddWeather action', () => {
    const payload = { city: {name: 'Liverpool'}, list: [ {main: {temp: 12.5} }] } as Weather;
    const expectedState: AppState = {
      weather: [payload],
      errorMessage: ''
    };
    const action = new AddWeather(payload);
    const result = weatherReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  it('weatherReducer should update error in state for HandleWeatherSearchError action', () => {
    const payload = 'error';
    const expectedState: AppState = {
      weather: [],
      errorMessage: payload
    };
    const action = new HandleWeatherSearchError(payload);
    const result = weatherReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  it('weatherReducer should not update state for SearchWeather action', () => {
    const payload = 'Liverpool';
    const action = new SearchWeather(payload);
    const result = weatherReducer(initialState, action);

    expect(result).toEqual(initialState);
  });
});
