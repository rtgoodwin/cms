# Release Notes for Craft CMS 5.7 (WIP)

### Content Management
- Element edit pages no longer have a “View in a new tab” action, if they also have a “View” button. ([#16623](https://github.com/craftcms/cms/pull/16623))
- Removed the “Always show focus rings” user accessibility preference. ([#16585](https://github.com/craftcms/cms/pull/16585))

### Accessibility
- When a modal or slideout is triggered from a disclosure menu, focus is now set to the menu button when the modal/slideout is closed. ([#16587](https://github.com/craftcms/cms/pull/16587))

### Administration
- Added “Icon” and “Color” settings to Dropdown field options. ([#16645](https://github.com/craftcms/cms/pull/16645))
- The email settings page now shows a “Test” button when `allowAdminChanges` is disabled. ([#16508](https://github.com/craftcms/cms/discussions/16508))
- Added the `--batch-size` option for `resave/*` commands. ([#16586](https://github.com/craftcms/cms/issues/16586))

### Development
- Added a `defaultLabel` nested field to Link fields’ GraphQL data. ([#16637](https://github.com/craftcms/cms/issues/16637))

### Extensibility
- Global nav items and breadcrumbs can now have `aria-label` attributes via an `ariaLabel` property.
- Editable tables now support `icon` columns.
- Added `craft\base\ElementInterface::getSerializedFieldValuesForDb()`.
- Added `craft\base\FieldInterface::serializeValueForDb()`.
- Added `craft\db\Table::BULKOPEVENTS`.
- Added `craft\db\Table::SEARCHINDEXQUEUE_FIELDS`.
- Added `craft\db\Table::SEARCHINDEXQUEUE`.
- Added `craft\events\BulkOpEvent::defer()`. ([#16655](https://github.com/craftcms/cms/pull/16655))
- Added `craft\fields\BaseOptionsField::$optionColors`, which can be set to `true` by subclasses to enable the “Color” setting for field options. ([#16645](https://github.com/craftcms/cms/pull/16645))
- Added `craft\fields\BaseOptionsField::$optionIcons`, which can be set to `true` by subclasses to enable the “Icon” setting for field options. ([#16645](https://github.com/craftcms/cms/pull/16645))
- Added `craft\fields\data\ColorData::$label`. ([#16492](https://github.com/craftcms/cms/pull/16492))
- Added `craft\services\Elements::getBulkOpKeys()`.
- Added `craft\services\Search::indexElementIfQueued()`.
- Added `craft\services\Search::queueIndexElement()`.
- Added `Craft.ui.createIconPicker()`.
- Added `Craft.ui.createIconPickerField()`.

### System
- The `changedattributes` and `changedfields` tables are now cleaned up during garbage collection. ([#16531](https://github.com/craftcms/cms/pull/16531))
- The `resourcepaths` table is now truncated when clearing control panel resources, via the Caches utility or the `clear-caches/cp-resources` command. ([#16514](https://github.com/craftcms/cms/issues/16514))
- Date values for custom fields are now represented as ISO-8601 date strings (with time zones) within element exports. ([#16629](https://github.com/craftcms/cms/pull/16629))
- “Updating search indexes” queue jobs no longer do anything if search indexes were already updated for the element since the job was created. ([#16644](https://github.com/craftcms/cms/pull/16644))
