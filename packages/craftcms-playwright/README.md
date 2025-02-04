# Playwright tests setup for Craft CMS

## Installation


## Usage

- run `npx craft-playwright test` (from the cms repo’s location) to boot up docker environment, install Craft CMS in it, run all the tests and shut down the docker environment
- run `npx craft-playwright test mytestgroup` (from the cms repo’s location) to boot up docker environment, install Craft CMS in it, run only “mytestgroup” tests and shut down the docker environment
- `npx craft-playwright boot` can be used to set up the docker env & install Craft CMS in it. After which you can run `npx playwright test` to run tests. To shut down the testing environment, use `npx craft-playwright down`.