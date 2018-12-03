import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getPageTitleText()).toEqual('Pick your winning number');
  });

  it('should display play column', () => {
    page.navigateTo();
    expect(page.getPageTitleText()).toEqual('Recently Played Numbers');
  })
});
