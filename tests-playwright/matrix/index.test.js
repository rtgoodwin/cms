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
  // add nested entry to the matrix & save, check the card was added and has the modified indicator
  // check that the nested entry can be edited after being created
  // and save the root entry
  test('Create card for new root entry', async ({page, baseURL}) => {
    // create new entry that contains matrix field in cards view mode
    await page.getByLabel('New entry in the Test Matrix').click();
    // add nested entry to the matrix & save,
    await page.getByRole('button', { name: 'plus New entry' }).click();
    await page.locator('.slideout-container:not(.hidden) .so-content input[name$="[fields][plainTextField]"]').fill('card 1');
    await page.getByRole('button', { name: 'Create entry' }).click();

    const firstCard = page.locator('#fields-matrixCardsField-field .cards > li:first-child .card');
    await firstCard.waitFor();
    const firstCardId = await firstCard.getAttribute('id');

    // check the card was added and has the modified indicator
    await expect(page.locator('#'+firstCardId)).toContainText('card 1');
    await expect(page.locator('#fields-matrixCardsField-field').getByTitle('This field has been modified.')).toBeVisible();

    // check that the nested entry can be edited after being created
    await page.locator('#'+firstCardId).getByLabel('Actions').click();
    await page.getByRole('button', { name: 'Edit entry' }).click();
    await expect(page.locator('.slideout-container:not(.hidden) .so-content input[name$="[fields][plainTextField]"]')).toHaveValue('card 1');

    // and save the root entry
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Create entry' }).click();
  });

  // edit entry from previous test
  // check that the entry nested in a matrix can be edited
  // update text field value & save
  // check that the modified indicators show
  // save root entry and check if the change is there
  test('Edit nested entry, save and check if the value saved', async ({page, baseURL}) => {
    // edit entry from previous test
    const labelLink = page.locator("#elements tr:first-child th .label-link");
    await labelLink.waitFor();
    await page.locator("#elements").getByRole('link', { name: 'Entry' }).click();

    let firstCard = page.locator('#fields-matrixCardsField-field .cards > li:first-child .card');
    await firstCard.waitFor();
    let firstCardId = await firstCard.getAttribute('id');

    // check that the entry nested in a matrix can be edited
    await page.locator('#'+firstCardId).getByLabel('Actions').click();
    await page.getByRole('button', { name: 'Edit entry' }).click();

    // update text field value & save
    await page.locator('.slideout-container:not(.hidden) .so-content input[name$="[fields][plainTextField]"]').fill('card 1 edited');
    const discardBtn = page.locator('.slideout-container:not(.hidden) .so-footer .discard-changes-btn');
    await discardBtn.waitFor();
    await page.getByRole('button', { name: 'Save' }).click();

    // check that the modified indicators show
    await expect(page.locator('#fields-matrixCardsField-field').getByTitle('This field has been modified.')).toBeVisible();
    await expect(page.getByTitle('This entry has been edited.')).toBeVisible();

    // save root entry
    await page.keyboard.press('ControlOrMeta+s');

    await firstCard.waitFor();
    firstCardId = await firstCard.getAttribute('id');
    // and check if the change is there
    await expect(page.locator('#'+firstCardId)).toContainText('card 1 edited');
  });

});