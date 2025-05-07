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
    await page.waitForLoadState();

    // add nested entry to the matrix & save,
    await page.locator('#content').getByRole('button', { name: 'New entry' }).click();

    // fill out the field
    await page.locator('.slideout-container:not(.hidden) .so-content input[name$="[fields][plainTextField2]"]').pressSequentially('card 1', { delay: 100 });

    // check if the draft card was attached to the dom
    const firstCard = page.locator('#fields-matrixCardsField-field .cards > li:first-child .card');
    await firstCard.waitFor({state: 'attached'});
    const firstCardId = await firstCard.getAttribute('id');

    // save nested entry
    await page.getByRole('button', { name: 'Create entry' }).click();

    // wait for the status of the card to get updated
    await firstCard.locator('.status-label-text:text-is("Live")').waitFor();

    // check the card was added and the field has the modified indicator
    await expect(page.locator('#'+firstCardId)).toContainText('card 1');
    await expect(page.locator('#fields-matrixCardsField-field').getByTitle('This field has been modified.')).toBeVisible();

    // check that the nested entry can be edited after being created
    await page.locator('#'+firstCardId).getByRole('button', { name: 'Edit entry' }).click();
    await expect(page.locator('.slideout-container:not(.hidden) .so-content input[name$="[fields][plainTextField2]"]'))
      .toHaveValue('card 1');
    await page.getByRole('button', { name: 'Cancel' }).click();

    // and save the root entry
    await page.getByRole('button', { name: 'Create entry' }).click();
  });

  // edit entry from previous test
  // check that the entry nested in a matrix can be edited
  // update text field value & save
  // check that the modified indicators show
  // save root entry and check if the change is there
  test('Edit nested entry, save and check if the value saved', async ({page, baseURL}) => {
    // edit entry from previous test
    await page.locator("#elements tr:first-child th .label-link").waitFor();
    await page.locator("#elements").getByRole('link', { name: 'Entry' }).click();
    await page.waitForLoadState();

    let firstCard = page.locator('#fields-matrixCardsField-field .cards > li:first-child .card');
    await firstCard.waitFor();
    let firstCardId = await firstCard.getAttribute('id');

    // check that the entry nested in a matrix can be edited
    await page.locator('#'+firstCardId).getByRole('button', { name: 'Edit entry' }).click();

    // update text field value & save
    const slideout = page.locator('.slideout-container:not(.hidden)');
    // wait for the input field to be visible
    await slideout.locator('.so-content input[name$="[fields][plainTextField2]"]').waitFor();
    await slideout.locator('.so-content input[name$="[fields][plainTextField2]"]').pressSequentially('card 1 edited', { delay: 100 });
    //await slideout.locator('.so-footer .discard-changes-btn').waitFor();
    await slideout.getByRole('button', { name: 'Save' }).click();

    await page.locator('#revision-indicators').getByTitle('Saving').waitFor({state: 'hidden'});

    // check that both modified indicators show
    await expect(page.locator('#fields-matrixCardsField-field').getByTitle('This field has been modified.')).toBeVisible();
    await expect(firstCard.getByTitle('This entry has been edited.')).toBeVisible();

    // save root entry
    await page.keyboard.press('ControlOrMeta+s');
    await page.locator('#revision-indicators').getByTitle('Saving').waitFor({state: 'hidden'});
    //await firstCard.waitFor();
    firstCardId = await firstCard.getAttribute('id');

    // and check if the change is there
    await expect(page.locator('#'+firstCardId)).toContainText('card 1 edited');
  });

  // edit entry from previous test
  // add a second nested entry to the matrix & save
  // check the card was added and that the blue indicators are there
  // discard root entry changes
  // check that there's no blue indicators and there's only one card in the matrix field
  test('Check that added nested entry can be discarded', async ({page, baseURL}) => {
    // edit entry from previous test
    await page.locator("#elements tr:first-child th .label-link").waitFor();
    await page.locator("#elements").getByRole('link', { name: 'Entry' }).click();
    await page.waitForLoadState();

    // we need to turn the root entry into a draft or the second nested entry won't save against a draft via playwright in headless mode
    await page.locator('#slug').pressSequentially('test', { delay: 100 });
    await page.locator('#content-notice .discard-changes-btn').waitFor();

    // add a second nested entry to the matrix,
    await page.getByRole('button', { name: 'New entry' }).click();
    const slideout = page.locator('.slideout-container:not(.hidden)');
    await slideout.locator('.so-content input[name$="[fields][plainTextField2]"]').waitFor();
    await slideout.locator('.so-content input[name$="[fields][plainTextField2]"]').pressSequentially('card 2', { delay: 100 });

    // wait for the draft card to be attached
    const lastCard = page.locator('#fields-matrixCardsField-field .cards > li:last-child .card');
    await lastCard.waitFor({state: 'attached'});

    // save the second nested entry
    await slideout.getByRole('button', { name: 'Create entry' }).click();

    // wait till save is done
    await page.locator('#revision-indicators').getByTitle('Saving').waitFor({state: 'hidden'});
    await lastCard.locator('.status-label-text:text-is("Live")').waitFor();

    // check the card was added and that the blue indicators are there
    await expect(lastCard).toContainText('card 2');
    await expect(page.locator('#fields-matrixCardsField-field').getByTitle('This field has been modified.')).toBeVisible();
    await expect(page.locator('#fields-matrixCardsField-field').getByTitle('This is a new entry.')).toBeVisible();

    // discard root entry changes
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    await page.locator('#content .discard-changes-btn').click();
    await page.waitForLoadState();

    // check that there's no blue indicators
    await expect(page.locator('#fields-matrixCardsField-field').getByTitle('This field has been modified.')).not.toBeVisible();
    await expect(lastCard.getByTitle('This is a new entry.')).not.toBeVisible();

    // and there's only one card in the matrix field
    await expect(page.locator('#fields-matrixCardsField-field .cards .card')).toHaveCount(1);
  });

});