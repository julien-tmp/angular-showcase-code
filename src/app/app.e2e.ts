import { browser, by, element } from 'protractor';
import 'tslib';

describe('App', () => {

  beforeEach(async () => {
    await browser.get('/');
  });

  it('should have a title', async () => {
    const subject = await browser.getTitle();
    const result  = 'Angular code showcase';
    expect(subject).toEqual(result);
  });

  it('should have <swapi-component>', async () => {
    const subject = await element(by.css('swapi-component')).isPresent();
    const result  = true;
    expect(subject).toEqual(result);
  });

});
