import { Weather } from './model/weather';

export interface AppState {
  readonly weather: Weather[];
  readonly errorMessage: string;
}
