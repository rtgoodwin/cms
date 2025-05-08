# Playwright tests setup for Craft CMS

## Installation


## Usage

All commands should be run from the cms repo’s location
- run `npx craft-playwright test` to boot up docker environment, install Craft CMS in it, run all the tests and shut down the docker environment
- run `npx craft-playwright test mytestgroup` to boot up docker environment, install Craft CMS in it, run only “mytestgroup” tests and shut down the docker environment
- `npx craft-playwright boot` can be used to set up the docker env & install Craft CMS in it. 
  - After which you can run `npx playwright test` to run tests.
  - You can add the `--ui` flag to tun tests in interactive UI mode
  - You can add the `--debug` flag to tun tests in interactive UI mode with debugger that lets you step over the test line by line
  - To shut down the testing environment, use `npx craft-playwright down`.

- to start test generator
  - run `npx craft-playwright boot`
  - run `npx playwright codegen 127.0.0.1:8089/admin`


> [!TIP]
> For tests on pages that use `ElementEditor`, use `.pressSequentially('text', { delay: 100 })` instead of `.fill('text')` because we have custom keyboard handling. Using `fill` will cause the tests to be flaky (the fact that text was written won't always be acknowledged). 