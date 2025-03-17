# Release Notes for Craft CMS 4.15 (WIP)

### Content Management
- Window scrolling is now blocked when a modal window is open. ([#16768](https://github.com/craftcms/cms/pull/16768))

### Administration
- Added the `db/repair` command. ([#16812](https://github.com/craftcms/cms/pull/16812))
- Added the `--batch-size` option for `resave/*` commands. ([#16586](https://github.com/craftcms/cms/issues/16586))
- The `users/create` command now prompts to send an activation email, or outputs an activation URL. ([#16794](https://github.com/craftcms/cms/pull/16794))
- Dragging headings within the Customize Sources modal now also drags any subsequent sources. ([#16737](https://github.com/craftcms/cms/issues/16737))
- When switching field types, any field settings which are defined by the same base class are now preserved. ([#16783](https://github.com/craftcms/cms/pull/16783))

### Extensibility
- Global nav items and breadcrumbs can now have `aria-label` attributes via an `ariaLabel` property.
- Added `craft\base\ElementInterface::getSerializedFieldValuesForDb()`.
- Added `craft\base\FieldInterface::serializeValueForDb()`.
- Added `craft\db\Connection::getIsMaria()`.
- Added `craft\db\Table::SEARCHINDEXQUEUE_FIELDS`.
- Added `craft\db\Table::SEARCHINDEXQUEUE`.
- Added `craft\db\mysql\QueryBuilder::jsonContains()`.
- Added `craft\db\mysql\QueryBuilder::jsonExtract()`.
- Added `craft\db\pgsql\QueryBuilder::jsonContains()`.
- Added `craft\db\pgsql\QueryBuilder::jsonExtract()`.
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
- Updated yii2-debug to 2.1.26.
