import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getPageTitle() {
    return browser.findElement(by.className('navbar-brand')).getText();
  }

  getTableRows() {
    return element.all(by.css('tbody')).all(by.tagName('tr'));
  }

  getCityNameFromTable() {
    return element.all(by.css('tbody')).all(by.tagName('tr')).all(by.tagName('td')).get(0).getText();
  }

  getFirstTemperatureFromTable() {
    return element.all(by.css('tbody')).all(by.tagName('tr')).all(by.tagName('td')).get(1).getText();
  }

  getInput() {
    return browser.findElement(by.css('input')).getText();
  }

  setInput(text) {
    return browser.findElement(by.css('input')).sendKeys(text);
  }

  getSearchButton() {
    return browser.findElement(by.css('button'));
  }
}
