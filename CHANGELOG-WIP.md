# Release Notes for Craft CMS 4.15 (WIP)

### Administration
- Added the `--batch-size` option for `resave/*` commands. ([#16586](https://github.com/craftcms/cms/issues/16586))

### Extensibility
- Global nav items and breadcrumbs can now have `aria-label` attributes via an `ariaLabel` property.
- Added `craft\base\ElementInterface::getSerializedFieldValuesForDb()`.
- Added `craft\base\FieldInterface::serializeValueForDb()`.
- Added `craft\db\Table::SEARCHINDEXQUEUE_FIELDS`.
- Added `craft\db\Table::SEARCHINDEXQUEUE`.
- Added `craft\queue\ReleasableQueueInterface`. ([#16672](https://github.com/craftcms/cms/pull/16672))
- Added `craft\services\Search::indexElementIfQueued()`.
- Added `craft\services\Search::queueIndexElement()`.

### System
- `craft\queue\Queue::release()` and `releaseAll()` now call `release()` and `releaseAll()` on the proxied queue if it implements `craft\queue\ReleasableQueueInterface`. ([#16672](https://github.com/craftcms/cms/pull/16672))
- The `changedattributes` and `changedfields` tables are now cleaned up during garbage collection. ([#16531](https://github.com/craftcms/cms/pull/16531))
- The `resourcepaths` table is now truncated when clearing control panel resources, via the Caches utility or the `clear-caches/cp-resources` command. ([#16514](https://github.com/craftcms/cms/issues/16514))
- Date values for custom fields are now represented as ISO-8601 date strings (with time zones) within element exports. ([#16629](https://github.com/craftcms/cms/pull/16629))
- “Updating search indexes” queue jobs no longer do anything if search indexes were already updated for the element since the job was created. ([#16644](https://github.com/craftcms/cms/pull/16644))
- Updated Yii to 2.0.52.
