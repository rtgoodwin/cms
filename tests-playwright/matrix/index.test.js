const {test, expect} = require('@craftcms/playwright');
const craft = require('@craftcms/playwright/_craft');

test.beforeAll(async ({}) => {
  await craft.cleanAll();
  await craft.loadFixture('Entry');
});

test.beforeEach(async ({page}) => {
  await page.goto('./entries/testMatrix');
});

test.describe('Cards', () => {

  // create new entry that contains matrix field in cards view mode
  // add nested entry to the matrix, check the card was added and has the modified indicator
  // check that the nested entry can be edited after being created
  // and save the root entry
  test('Create card for new root entry', async ({page, baseURL}) => {
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

    await expect(page.locator('.slideout-container:not(.hidden) .so-content input[name$="[fields][plainTextField]"]')).toHaveValue('card 1');

    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Create entry' }).click();
  });

  // edit entry from previous test
  // check that the entry nested in a matrix can be edited
  // update text field value & save
  // check that the modified indicator shows
  // save root entry, open it again, open slideout and check if the change is there
  test('Edit nested entry, save and check if the value saved', async ({page, baseURL}) => {
    await page.getByRole('link', { name: 'Entry' }).click();

    const firstCardSelector = '#fields-matrixCardsField-field .cards .card:first-child';
    const firstCard = await page.waitForSelector(firstCardSelector);
    const firstCardId = await firstCard.getAttribute('id');

    await page.locator('#'+firstCardId).getByLabel('Actions').click();
    await page.getByRole('button', { name: 'Edit entry' }).click();
    await page.locator('.slideout-container:not(.hidden) .so-content input[name$="[fields][plainTextField]"]').fill('card 1 edited');

    await page.getByRole('button', { name: 'Save' }).click();
    await page.locator('#fields-matrixCardsField-field').getByTitle('This field has been modified.').toBeVisible();
    await page.getByTitle('This entry has been edited.').toBeVisible();
    await page.press('ControlOrMeta+s');
  });

});