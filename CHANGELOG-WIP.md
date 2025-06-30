# Release Notes for Craft CMS 4.16 (WIP)

### Content Management
- Element condition builders now show condition rules for custom fields with duplicate names. ([#17361](https://github.com/craftcms/cms/pull/17361))

### Administration
- Assets and Categories fields no longer have “Show the site menu” settings. ([#17156](https://github.com/craftcms/cms/issues/17156))
- Improved the wording of validation errors caused by relational fields’ “Validate related [type]” settings. ([#9960](https://github.com/craftcms/cms/discussions/9960))

### Extensibility
- Added `craft\fields\BaseRelationField::canShowSiteMenu()`.
- Added `craft\queue\BaseBatchedJob::after()`.
- Added `craft\queue\BaseBatchedJob::afterBatch()`.
- Added `craft\queue\BaseBatchedJob::before()`.
- Added `craft\queue\BaseBatchedJob::beforeBatch()`.
- `craft\fields\data\ColorData` now extends `craft\base\Model` and includes `blue`, `green`, `hex`, `luma`, `red`, and `rgb` attributes in its array keys. ([#17265](https://github.com/craftcms/cms/issues/17265))
