const {test, expect} = require('@craftcms/playwright');
const craft = require('@craftcms/playwright/_craft');

test.beforeAll(async ({}) => {
  await craft.cleanAll();
  await craft.loadFixture('Entry');
});

test.beforeEach(async ({page}) => {
  await page.goto('./entries/testMatrix');
});

test('Cards', async ({page, baseURL}) => {
  await page.getByLabel('New entry in the Test Matrix').click();
  await page.getByRole('button', { name: 'plus New entry' }).click();
  await page.locator('.so-content input[name$="[fields][plainTextField]"]').fill('card 1');
  await page.getByRole('button', { name: 'Create entry' }).click();

  const firstCardSelector = '#fields-matrixCardsField-field .cards .card:first-child';
  const firstCard = await page.waitForSelector(firstCardSelector);
  const firstCardId = await firstCard.getAttribute('id');

  await expect(page.locator('#'+firstCardId)).toContainText('card 1');

  await expect(page.locator('#fields-matrixCardsField-field').getByTitle('This field has been modified.')).toBeVisible();
  await page.locator('#'+firstCardId).getByLabel('Actions').click();
  await page.getByRole('button', { name: 'Edit entry' }).click();
  await page.locator('.slideout-container:not(.hidden) .so-content input[name$="[fields][plainTextField]"]').fill('card 1 edited');
  await page.getByRole('button', { name: 'Save' }).click();
  //await expect(page.locator('#'+firstCardId)).toContainText('card 1 edited');

  await page.getByRole('button', { name: 'Create entry' }).click();
});