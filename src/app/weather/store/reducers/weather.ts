import * as WeatherActions from '../actions/weather';
import { AppState } from '../../../app.state';

const initialState: AppState = {
 weather: [],
 errorMessage: ''
};

export function weatherReducer(state = initialState, action: WeatherActions.Actions) {
  switch (action.type) {
    case WeatherActions.ADD_WEATHER:
      return {
       weather: [...state.weather, action.payload],
        errorMessage: ''
      };
    case WeatherActions.HANDLE_WEATHER_SEARCH_ERROR:
      return {...state, errorMessage : action.payload};
    default:
      return state;
  }
}
