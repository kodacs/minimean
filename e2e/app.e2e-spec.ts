import { MinimeanPage } from './app.po';

describe('minimean App', function() {
  let page: MinimeanPage;

  beforeEach(() => {
    page = new MinimeanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
