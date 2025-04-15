# Playwright tests setup for Craft CMS

## Installation


## Usage

All commands should be run from the cms repo’s location
- run `npx craft-playwright test` to boot up docker environment, install Craft CMS in it, run all the tests and shut down the docker environment
- run `npx craft-playwright test mytestgroup` to boot up docker environment, install Craft CMS in it, run only “mytestgroup” tests and shut down the docker environment
- `npx craft-playwright boot` can be used to set up the docker env & install Craft CMS in it. 
  - After which you can run `npx playwright test` to run tests.
  - You can add the `--ui` flag to tun tests in interactive UI mode
  - To shut down the testing environment, use `npx craft-playwright down`.

- to start test generator
  - run `npx craft-playwright boot`
  - run `npx playwright codegen 127.0.0.1:8089/admin`