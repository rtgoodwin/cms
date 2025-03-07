# Release Notes for Craft CMS 5.7 (WIP)

### Content Management
- Added a “Duplicate” action to nested element cards and inline-editable Matrix blocks. ([#16819](https://github.com/craftcms/cms/pull/16819))
- Added support for sorting embedded element indexes by element attributes and custom fields. ([#16732](https://github.com/craftcms/cms/pull/16732))
- Element edit pages no longer have a “View in a new tab” action, if they also have a “View” button. ([#16623](https://github.com/craftcms/cms/pull/16623))
- Plain Text fields no longer show the remaining charater counter when displayed statically.
- Removed the “Always show focus rings” user accessibility preference. ([#16585](https://github.com/craftcms/cms/pull/16585))

### Accessibility
- Improved the accessibility of Tags fields for screen readers. ([#16754](https://github.com/craftcms/cms/pull/16754))
- Removed redundant ARIA roles and labels from reorder buttons. ([#16826](https://github.com/craftcms/cms/pull/16826))
- Animated assets no longer have animated thumbnails. ([#16497](https://github.com/craftcms/cms/pull/16497))

### Content Management
- Window scrolling is now blocked when a modal window is open. ([#16768](https://github.com/craftcms/cms/pull/16768))

### Administration
- Added the “Button Group” field type. ([#16782](https://github.com/craftcms/cms/pull/16782))
- Added the “JSON” field type. ([#16809](https://github.com/craftcms/cms/pull/16809))
- Added “Icon” and “Color” settings to Checkboxes, Dropdown, Multi-select, and Radio Buttons field options. ([#16645](https://github.com/craftcms/cms/pull/16645))
- Added an optional “Download” advanced field to Link fields. ([#16844](https://github.com/craftcms/cms/pull/16844))
- Added support for read-only custom fields, via new “Editability Conditions” on custom fields’ field layout settings. ([#16805](https://github.com/craftcms/cms/pull/16805))
- “Template” field layout UI elements are now re-rendered on each autosave. ([#16837](https://github.com/craftcms/cms/discussions/16837))
- The email settings page now shows a “Test” button when `allowAdminChanges` is disabled. ([#16508](https://github.com/craftcms/cms/discussions/16508))
- Entry type chips within entry type select inputs now link to their full settings pages. ([#16838](https://github.com/craftcms/cms/pull/16838))
- Double-clicking on entry type chips within entry type select inputs now opens the entry type’s settings in a slideout, rather than its override settings. ([#16838](https://github.com/craftcms/cms/pull/16838))
- Added the `db/repair` command. ([#16812](https://github.com/craftcms/cms/pull/16812))
- Added the `fields/delete` command. ([#16828](https://github.com/craftcms/cms/pull/16828))
- Added the `--batch-size` option for `resave/*` commands. ([#16586](https://github.com/craftcms/cms/issues/16586))
- The `users/create` command now prompts to send an activation email, or outputs an activation URL. ([#16794](https://github.com/craftcms/cms/pull/16794))
- Dragging headings within the Customize Sources modal now also drags any subsequent sources. ([#16737](https://github.com/craftcms/cms/issues/16737))
- When switching field types, any field settings which are defined by the same base class are now preserved. ([#16783](https://github.com/craftcms/cms/pull/16783))
- `classHandle`, `content`, `rawContent`, and `value` are no longer globally-reserved handles.
- `searchKeywords` is no longer a globally-reserved handle, except for custom fields.
- `section` and `type` are no longer globally-reserved handles, except for custom fields within entry type field layouts.
- `postDate` is no longer a reserved custom field handle, except within entry type field layouts.
- `username` is no longer a reserved custom field handle, except within the user field layout.
- Added several new icons.

### Development
- Added the `canonicalsOnly` element query param.
- Added the `defaultLabel` nested field to Link fields’ GraphQL data. ([#16637](https://github.com/craftcms/cms/issues/16637))
- Added the `download` and `filename` nested fields to Link fields’ GraphQL data. ([#16844](https://github.com/craftcms/cms/pull/16844))
- Added `element`, `asset`, `entry`, etc., nested fields to Link fields’ GraphQL data. ([#16698](https://github.com/craftcms/cms/pull/16698))
- Added the `withProvisionalDrafts` GraphQL element query argument. ([#16720](https://github.com/craftcms/cms/pull/16720))
- It’s now possible to reference custom field handles in advanced element query `orderBy` expressions. ([#16729](https://github.com/craftcms/cms/pull/16729))

### Extensibility
- Global nav items and breadcrumbs can now have `aria-label` attributes via an `ariaLabel` property.
- Editable tables now support `icon` columns.
- Added `craft\base\Element::couldHaveAnimatedThumb()`.
- Added `craft\base\ElementInterface::baseGqlType()`.
- Added `craft\base\ElementInterface::getSerializedFieldValuesForDb()`.
- Added `craft\base\Field::EVENT_DEFINE_ACTION_MENU_ITEMS`. ([#16779](https://github.com/craftcms/cms/discussions/16779))
- Added `craft\base\FieldInterface::serializeValueForDb()`.
- Added `craft\base\FieldLayoutComponent::conditionalSettingsHtml()`.
- Added `craft\base\FieldLayoutComponent::normalizeCondition()`.
- Added `craft\base\FieldLayoutElement::alwaysRefresh()`.
- Added `craft\base\FieldTrait::$static`.
- Added `craft\db\Table::BULKOPEVENTS`.
- Added `craft\db\Table::SEARCHINDEXQUEUE_FIELDS`.
- Added `craft\db\Table::SEARCHINDEXQUEUE`.
- Added `craft\events\BulkOpEvent::defer()`. ([#16655](https://github.com/craftcms/cms/pull/16655))
- Added `craft\fieldlayoutelements\CustomField::getEditCondition()`.
- Added `craft\fieldlayoutelements\CustomField::setEditCondition()`.
- Added `craft\fields\BaseOptionsField::$optionColors`, which can be set to `true` by subclasses to enable the “Color” setting for field options. ([#16645](https://github.com/craftcms/cms/pull/16645))
- Added `craft\fields\BaseOptionsField::$optionIcons`, which can be set to `true` by subclasses to enable the “Icon” setting for field options. ([#16645](https://github.com/craftcms/cms/pull/16645))
- Added `craft\fields\data\ColorData::$label`. ([#16492](https://github.com/craftcms/cms/pull/16492))
- Added `craft\fields\data\JsonData`.
- Added `craft\fields\data\LinkData::$download`.
- Added `craft\fields\data\LinkData::getFilename()`.
- Added `craft\fields\data\LinkData::setFilename()`.
- Added `craft\fields\linktypes\BaseElementLinkType::elementGqlType()`.
- Added `craft\fields\linktypes\BaseLinkType::filename()`.
- Added `craft\helpers\Json::reindent()`.
- Added `craft\models\FieldLayout::getEditableCustomFields()`.
- Added `craft\queue\ReleasableQueueInterface`. ([#16672](https://github.com/craftcms/cms/pull/16672))
- Added `craft\services\Elements::getBulkOpKeys()`.
- Added `craft\services\Search::indexElementIfQueued()`.
- Added `craft\services\Search::queueIndexElement()`.
- Added `craft\web\View::registerIcon()`.
- Added `craft\web\assets\codemirror\CodeMirrorAsset`.
- Added `Craft.animate()` and `Craft.animateAll()`. ([#16849](https://github.com/craftcms/cms/pull/16849))
- Added `Craft.ui.createIconPicker()`.
- Added `Craft.ui.createIconPickerField()`.
- Added `Craft.ui.icon()`.
- `craft\base\Element::fieldLayoutFields()` now has an `$editableOnly` argument.
- The `elements/duplicate` action no longer creates an unpublished draft by default, or deletes the source element if it’s a provisional draft by default. `asUnpublishDraft` and `deleteProvisionalDraft` params can be passed to it to re-enable those behaviors where needed.

### System
- `craft\queue\Queue::release()` and `releaseAll()` now call `release()` and `releaseAll()` on the proxied queue if it implements `craft\queue\ReleasableQueueInterface`. ([#16672](https://github.com/craftcms/cms/pull/16672))
- The `changedattributes` and `changedfields` tables are now cleaned up during garbage collection. ([#16531](https://github.com/craftcms/cms/pull/16531))
- The `resourcepaths` table is now truncated when clearing control panel resources, via the Caches utility or the `clear-caches/cp-resources` command. ([#16514](https://github.com/craftcms/cms/issues/16514))
- Date values for custom fields are now represented as ISO-8601 date strings (with time zones) within element exports. ([#16629](https://github.com/craftcms/cms/pull/16629))
- “Updating search indexes” queue jobs no longer do anything if search indexes were already updated for the element since the job was created. ([#16644](https://github.com/craftcms/cms/pull/16644))
- Matrix and relational fields now eager-load their nested/related elements when displaying and validating their inputs.
- Updated Yii to 2.0.52.
- Updated GraphiQL to 3.8.3. ([#16836](https://github.com/craftcms/cms/pull/16836))
- Fixed a bug where indicator icons within field layout element chips didn’t have alternative text. ([#16297](https://github.com/craftcms/cms/discussions/16297))
- Fixed a bug where slide pickers within selected field layout elements didn’t have a label. ([#16696](https://github.com/craftcms/cms/pull/16696))
