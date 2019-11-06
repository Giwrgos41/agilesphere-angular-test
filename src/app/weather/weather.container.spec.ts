import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherContainerComponent } from './weather.container';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { SearchWeather } from './store';
import { Weather } from '../model/weather';

describe('WeatherContainer', () => {
  let component: WeatherContainerComponent;
  let fixture: ComponentFixture<WeatherContainerComponent>;

  const mockWeather = [
    { city: {name: 'Liverpool'}, list: [ {main: {temp: 12.5} }] },
    { city: {name: 'Leeds'}, list: [ {main: {temp: 11.4} }] }
  ];

  class StoreMock {
    select =  jasmine.createSpy().and.returnValue(of(mockWeather));
    dispatch = jasmine.createSpy();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherContainerComponent ],
      imports: [],
      providers: [
        {
          provide: Store,
          useClass: StoreMock,
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select weather list from store', () => {
    component.weatherResultsList.subscribe(data => {
      expect(data).toBe(mockWeather as Weather[]);
    });
  });

  it('should dispatch SearchWeather action with expected city name', () => {
    const city = 'Leeds';
    const store = TestBed.get(Store);

    component.citySearch(city);
    const action = new SearchWeather(city);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
