import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherContainerComponent } from './weather.container';
import { WeatherService } from './services/weather/weather.service';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import { StoreModule } from '@ngrx/store';
import { weatherReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WeatherEffect } from './store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({
      weather: weatherReducer
    }),
    EffectsModule.forFeature([WeatherEffect]),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    SearchComponent,
    ResultsComponent,
    WeatherContainerComponent
  ],
  providers: [
    WeatherService
  ]
})
export class WeatherModule { }
