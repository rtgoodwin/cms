const getUrl = (uri = '') => {
  const baseUrl = process.env.PW_BASE_URL;
  const baseUri = '/admin/';

  return baseUrl.replace(/(\/)+$/, '') + baseUri + uri.replace(/^(\/)+/, '');
};

const clickToNavigate = async (page, selector = '[type="submit"]') => {
  if (page === undefined) {
    throw new Error('The Playwright page class must be passed.');
  }

  return await Promise.all([page.waitForNavigation(), page.click(selector)]);
};

const waitForAutosaveToComplete = async (page) => {
  await page.locator('#revision-indicators').getByTitle('Saving').waitFor({state: 'hidden'});
}

module.exports = {
  getUrl,
  clickToNavigate,
  waitForAutosaveToComplete,
};
