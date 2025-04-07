# Release Notes for Craft CMS 4.15 (WIP)

### Content Management
- Condition rules for Checkboxes, Dropdown, Multi-select, and Radio Buttons fields now include “has a value” and “is empty” operators. ([#17015](https://github.com/craftcms/cms/pull/17015))
- The Assets index page now prompts for confirmation when moving more than 50 assets, or assets totalling more than 50MB, at once. ([#16908](https://github.com/craftcms/cms/pull/16908))
- The success notification displayed after an asset move now includes an “Undo” button, if less than 50 assets/50MB were involved in the move. ([#16908](https://github.com/craftcms/cms/pull/16908))
- Window scrolling is now blocked when a modal window is open. ([#16768](https://github.com/craftcms/cms/pull/16768))

### Administration
- Added the `db/repair` command. ([#16812](https://github.com/craftcms/cms/pull/16812))
- Added the `--batch-size` option for `resave/*` commands. ([#16586](https://github.com/craftcms/cms/issues/16586))
- The `plugin/install` command now accepts an `edition` argument, and prompts for the default edition if none is specified. ([#17030](https://github.com/craftcms/cms/pull/17030))
- The `plugin/uninstall` command now reports if no plugin is installed with the provided handle. ([#17030](https://github.com/craftcms/cms/pull/17030))
- The `users/create` command now prompts to send an activation email, or outputs an activation URL. ([#16794](https://github.com/craftcms/cms/pull/16794))
- Dragging headings within the Customize Sources modal now also drags any subsequent sources. ([#16737](https://github.com/craftcms/cms/issues/16737))
- When switching field types, any field settings which are defined by the same base class are now preserved. ([#16783](https://github.com/craftcms/cms/pull/16783))

### Development
- Added the `searchTermOptions` GraphQL query argument. ([#16979](https://github.com/craftcms/cms/pull/16979))
- Added the `revisionNotes` GraphQL entry mutation argument. ([#16943](https://github.com/craftcms/cms/issues/16943)) 

### Extensibility
- Global nav items and breadcrumbs can now have `aria-label` attributes via an `ariaLabel` property.
- Added `craft\base\ElementInterface::getSerializedFieldValuesForDb()`.
- Added `craft\base\FieldInterface::serializeValueForDb()`.
- Added `craft\base\conditions\BaseMultiSelectConditionRule::$includeEmptyOperators`.
- Added `craft\db\Connection::getIsMaria()`.
- Added `craft\db\Table::SEARCHINDEXQUEUE_FIELDS`.
- Added `craft\db\Table::SEARCHINDEXQUEUE`.
- Added `craft\db\mysql\QueryBuilder::jsonContains()`.
- Added `craft\db\mysql\QueryBuilder::jsonExtract()`.
- Added `craft\db\pgsql\QueryBuilder::jsonContains()`.
- Added `craft\db\pgsql\QueryBuilder::jsonExtract()`.
- Added `craft\queue\ReleasableQueueInterface`. ([#16672](https://github.com/craftcms/cms/pull/16672))
- Added `craft\records\User::haveIndexAttributesChanged()`.
- Added `craft\services\Search::indexElementIfQueued()`.
- Added `craft\services\Search::queueIndexElement()`.
- `craft\cache\ElementQueryTagDependency` now merges cache tags provided by the element query with any tags already set on its `$tags` property.  

### System
- `craft\queue\Queue::release()` and `releaseAll()` now call `release()` and `releaseAll()` on the proxied queue if it implements `craft\queue\ReleasableQueueInterface`. ([#16672](https://github.com/craftcms/cms/pull/16672))
- The `changedattributes` and `changedfields` tables are now cleaned up during garbage collection. ([#16531](https://github.com/craftcms/cms/pull/16531))
- The `resourcepaths` table is now truncated when clearing control panel resources, via the Caches utility or the `clear-caches/cp-resources` command. ([#16514](https://github.com/craftcms/cms/issues/16514))
- Date values for custom fields are now represented as ISO-8601 date strings (with time zones) within element exports. ([#16629](https://github.com/craftcms/cms/pull/16629))
- “Updating search indexes” queue jobs no longer do anything if search indexes were already updated for the element since the job was created. ([#16644](https://github.com/craftcms/cms/pull/16644))
- User caches are no longer invalidated on login attempts or when user management actions are taken. ([#16937](https://github.com/craftcms/cms/pull/16937))
- Batchable queue jobs now spawn new batches when their execution time is getting uncomfortably close to their TTR duration. ([#16947](https://github.com/craftcms/cms/pull/16947))
- Updated Yii to 2.0.52.
- Updated yii2-debug to 2.1.26.
- Updated Axios to 1.8.4.
- Fixed a bug where `CRAFT_WEB_URL` and `CRAFT_WEB_ROOT` environment variables could be overridden by `@web` and `@webroot` aliases define by the `aliases` config setting. ([#16980](https://github.com/craftcms/cms/pull/16980))
