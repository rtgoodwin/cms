# Release Notes for Craft CMS 4.15 (WIP)

### Administration
- Added the `--batch-size` option for `resave/*` commands. ([#16586](https://github.com/craftcms/cms/issues/16586))

### Extensibility
- Global nav items and breadcrumbs can now have `aria-label` attributes via an `ariaLabel` property.
- Added `craft\base\ElementInterface::getSerializedFieldValuesForDb()`.
- Added `craft\base\FieldInterface::serializeValueForDb()`.

### System
- The `changedattributes` and `changedfields` tables are now cleaned up during garbage collection. ([#16531](https://github.com/craftcms/cms/pull/16531))
- The `resourcepaths` table is now truncated when clearing control panel resources, via the Caches utility or the `clear-caches/cp-resources` command. ([#16514](https://github.com/craftcms/cms/issues/16514))
- Date values for custom fields are now represented as ISO-8601 date strings (with time zones) within element exports. ([#16629](https://github.com/craftcms/cms/pull/16629))
