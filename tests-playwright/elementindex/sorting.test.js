const {test, expect} = require('@craftcms/playwright');
const craft = require('@craftcms/playwright/_craft');

test.beforeAll(async ({}) => {
  await craft.cleanAll();
  await craft.loadFixture('Entry');
});

test.beforeEach(async ({page}) => {
  await page.goto('./entries/testSorting');
});

test.describe('Sorting', () => {
  test('Check customizing view', async ({page, baseURL}) => {

    const viewBtnSelector = '#toolbar button:has-text("View")'
    const viewBtn = await page.waitForSelector(viewBtnSelector);
    await page.click(viewBtnSelector);

    let menuId = await viewBtn.getAttribute('aria-controls');
    menuId = menuId.replace('.', '\\.');

    let cols = [
      "Number Field",
      "Plain Text Field",
      "Entry Type",
      "ID",
    ];

    for (let i = 0; i < cols.length; i++) {
      const itemSelector = '#' + menuId + ' .table-columns-field label:has-text("' + cols[i] + '")';
      await page.waitForSelector(itemSelector);
      await page.click(itemSelector);
    }

    const closeSelector = '#' + menuId + ' button:has-text("Close")';
    await page.waitForSelector(closeSelector);
    await page.click(closeSelector);

    for (let i = 0; i < cols.length; i++) {
      await expect(page.locator('.elements table.data thead')).toContainText(cols[i]);
    }

  });

  test('Check sort asc', async ({page, baseURL}) => {

    const viewBtnSelector = '#toolbar button:has-text("View")'
    const viewBtn = await page.waitForSelector(viewBtnSelector);
    await page.click(viewBtnSelector);

    let menuId = await viewBtn.getAttribute('aria-controls');
    menuId = menuId.replace('.', '\\.');

    const sortDropdownSelector = '#' + menuId + ' .sort-field select';
    const sortAscendingSelector = '#' + menuId + ' section button[data-dir="asc"]';
    const sortDescendingSelector = '#' + menuId + ' section button[data-dir="desc"]';
    const closeSelector = '#' + menuId + ' button:has-text("Close")';

    let cols = [
      {
        field: "Number Field",
        firstTitle: "Test sorting 1",
        lastTitle: "Test sorting 10",
      },
      {
        field: "Plain Text Field",
        firstTitle: "Test sorting 1",
        lastTitle: "Test sorting 3",
      },
      {
        field: "ID",
        firstTitle: "Test sorting 1",
        lastTitle: "Test sorting 10",
      },
    ];

    // test sort ascending
    for (let i = 0; i < cols.length; i++) {
      await page.locator(sortDropdownSelector).selectOption({'label': cols[i].field});
      await page.click(sortAscendingSelector);
      await page.click(closeSelector);

      await expect(page.locator('.elements table.data tbody tr').nth(0).locator('th[data-title="Entry"] .label-link')).toContainText(cols[i]['firstTitle']);
    }
  });

  test('Check sort desc', async ({page, baseURL}) => {

    const viewBtnSelector = '#toolbar button:has-text("View")'
    const viewBtn = await page.waitForSelector(viewBtnSelector);
    await page.click(viewBtnSelector);

    let menuId = await viewBtn.getAttribute('aria-controls');
    menuId = menuId.replace('.', '\\.');

    const sortDropdownSelector = '#' + menuId + ' .sort-field select';
    const sortAscendingSelector = '#' + menuId + ' section button[data-dir="asc"]';
    const sortDescendingSelector = '#' + menuId + ' section button[data-dir="desc"]';
    const closeSelector = '#' + menuId + ' button:has-text("Close")';

    let cols = [
      {
        field: "Number Field",
        firstTitle: "Test sorting 1",
        lastTitle: "Test sorting 10",
      },
      {
        field: "Plain Text Field",
        firstTitle: "Test sorting 1",
        lastTitle: "Test sorting 3",
      },
      {
        field: "ID",
        firstTitle: "Test sorting 1",
        lastTitle: "Test sorting 10",
      },
    ];

    // test sort ascending
    for (let i = 0; i < cols.length; i++) {
      await page.locator(sortDropdownSelector).selectOption({'label': cols[i].field});
      await page.click(sortAscendingSelector);
      await page.click(sortDescendingSelector);
      await page.click(closeSelector);

      await expect(page.locator('.elements table.data tbody tr').nth(0).locator('th[data-title="Entry"] .label-link')).toContainText(cols[i]['lastTitle']);
    }
  });
});
