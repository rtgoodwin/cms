const {exec} = require('child_process');
const path = require('path');
const {chromium, expect} = require('@playwright/test');
const craft = require('./_craft');

module.exports = async (config) => {
  console.log('Setting up');
  const {baseURL, db, password, projectPath, storageState, testDir, username} =
    config.projects[0].use;

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(new URL('./login', baseURL).href);
  await page.fill('.login-username', username);
  await page.fill('.login-password', password);

  //await Promise.all([page.waitForNavigation(), page.click('button#submit')]);
  await page.click('.login-form button[type="submit"]')
  await page.waitForURL('**/admin/dashboard');


  const title = page.locator('h1');
  await expect(title).toHaveText('Dashboard');

  // Save signed-in state
  await page.context().storageState({path: storageState});
  await browser.close();

  // Backup Craft database with saved session
  await craft.dbBackup();
};
