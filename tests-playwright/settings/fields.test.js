const {test, expect} = require('@craftcms/playwright');

test.describe('Fields - Empty Page', () => {
  // Make sure we start each test on the settings/fields page
  test.beforeEach(async ({page}) => {
    await page.goto('./settings/fields');
  });

  // Check if the settings/sections page shows empty sections message
  test('Check empty Fields page', async ({page, baseURL}) => {
    const zilch = page.locator('#content .zilch:visible p');
    await expect(zilch).toHaveText('No fields exist yet.');
  });

  // Check New fields page loads
  test('New field page', async ({page, baseURL}) => {
    const newButtonSelector = '#header #action-buttons a.submit';
    const newSectionButton = page.locator(newButtonSelector);
    await expect(newSectionButton).toHaveText('New field');
    await page.click(newButtonSelector);
    await expect(page).toHaveURL(
      new URL('./settings/fields/new', baseURL).href
    );

    const fields = [
      page.locator('#content input#name'),
      page.locator('#content input#handle'),
      page.locator('#content textarea#instructions'),
    ];

    for (let i = 0; i < fields.length; i++) {
      await expect(fields[i]).toBeEditable();
    }
  });
});

test.describe('Fields - New', () => {
  // Check if we can add a new channel section and create entry type for it on the fly
  test('Create new field', async ({page, baseURL}) => {
    await page.goto('./settings/fields/new');

    await page.fill('#content input#name', 'My Plain Text Field');
    await expect(page.locator('#content input#handle')).toHaveValue('myPlainTextField');

    await page.click('#action-buttons button.menubtn');
    await page.click('#form-action-menu a:has-text("Save and continue editing")')

    const urlRegExp = new RegExp(/settings\/fields\/edit\/\d+?$/, 'i');
    await expect(page).toHaveURL(urlRegExp);
    await expect(page.locator('h1')).toHaveText('My Plain Text Field');
  });
});

test.describe('Fields - Page', () => {
  // Make sure we start each test on the settings/fields page
  test.beforeEach(async ({page}) => {
    await page.goto('./settings/fields');
  });

  // Check if we can see the newly created field on the field page
  test('Check fields page with content', async ({page, baseURL}) => {
    let fieldsTable = page.locator('#content #fields-vue-admin-table .vuetable');
    await expect(fieldsTable).toBeVisible();
    await expect(fieldsTable).toContainText('My Plain Text Field');
    await expect(fieldsTable).toContainText('myPlainTextField');
  });

  // Check searching
  test('Check searching', async ({page, baseURL}) => {
    let searchInput = page.locator('#content #fields-vue-admin-table .search input[placeholder="Search"]');
    await expect(searchInput).toBeVisible();

    await searchInput.fill('I dont exist');
    await expect(page.locator('#content #fields-vue-admin-table .zilch:visible p')).toHaveText('No results.');
    
    await searchInput.fill('My Plain Text Field');
    await expect(page.locator('#content #fields-vue-admin-table .vuetable')).toContainText('myPlainTextField');
  });
});