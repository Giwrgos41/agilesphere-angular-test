import { AppPage } from './app.po';
import { browser, by, element, protractor } from 'protractor';

describe('angular-weather App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.waitForAngularEnabled(false);
    page.navigateTo();
  });

  describe('app start up', () => {
    it('should have page title', () => {
      expect(page.getPageTitle()).toBe('AgileSphere coding test - The Weather App');
    });

    it('should have an empty input field', () => {
      expect(page.getInput()).toBe('');
    });

    it('should have an empty table', () => {
      expect(page.getTableRows().count()).toBe(0);
    });
  });

  describe('search for a valid city', () => {
    beforeEach(() => {
      page.setInput('Leeds');
      page.getSearchButton().click();
      browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.css('td'))), 5000, 'Element taking too long to appear in the DOM');
    });

    it('should add a row on the table', () => {
      expect(page.getTableRows().count()).toBe(1);
    });

    it('should contain "Leeds" in city name cell', () => {
      expect(page.getCityNameFromTable()).toBe('Leeds');
    });

    it('should contain temperature information in the cell after city name', () => {
      expect(page.getFirstTemperatureFromTable()).toContain('°C');
    });
  });

  describe('search for an invalid city', () => {
    beforeEach(() => {
      page.setInput('ABC');
      page.getSearchButton().click();
    });

    it('should not add a row on the table', () => {
      expect(page.getTableRows().count()).toBe(0);
    });
  });
});
