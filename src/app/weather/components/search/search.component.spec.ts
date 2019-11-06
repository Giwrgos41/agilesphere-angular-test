import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SearchComponent } from './search.component';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let input;
  let searchButton;

  class StoreMock {
    select = jasmine.createSpy().and.returnValue(of('error'));
    dispatch = jasmine.createSpy();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [],
      providers: [
        {
          provide: Store,
          useClass: StoreMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('search button clicked', () => {
    beforeEach(() => {
      spyOn(component.citySearch, 'emit');
      input = fixture.debugElement.query(By.css('input')).nativeElement;
      searchButton = fixture.debugElement.nativeElement.querySelector('button');
    });

    it('should trigger search event on search button click', async () => {
      input.value = 'Liverpool';
      input.dispatchEvent(new Event('input'));

      expect(component.citySearch.emit).toHaveBeenCalledTimes(0);
      searchButton.click();

      expect(component.citySearch.emit).toHaveBeenCalledTimes(1);
    });

    it('should trigger search event with expected value on search button click', async () => {
      input.value = 'Liverpool';
      input.dispatchEvent(new Event('input'));
      searchButton.click();

      expect(component.citySearch.emit).toHaveBeenCalledWith('Liverpool');
    });

    it('should display expected error message', async () => {
      const errorMessage = fixture.debugElement.query(By.css('#error-message')).nativeElement;

      expect(errorMessage.textContent).toEqual('error');
    });
  });
});
