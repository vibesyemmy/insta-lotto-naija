import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getPageTitleText() {
    return element(by.css('lotto-front-number-picker .home-title')).getText();
  }
}
