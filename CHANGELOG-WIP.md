# Release Notes for Craft CMS 5.8 (WIP)

> [!NOTE]
> Elements with Link fields created before Craft 5.5.0 should be resaved to take advantage of the new “is of type” condition rule operator. ([#17277](https://github.com/craftcms/cms/pull/17277))

> [!NOTE]
> Elements with multi-instance relation fields created before Craft 5.3.0 should be resaved to ensure their condition rules continue to work properly. ([#17295](https://github.com/craftcms/cms/pull/17295))

### Content Management
- Element edit pages now have “Validate [type]” actions. ([#17316](https://github.com/craftcms/cms/pull/17316))
- Matrix fields set to the “inline-editable blocks” view mode now have “Expand all blocks” and “Collapse all blocks” actions. ([#17141](https://github.com/craftcms/cms/pull/17141))
- Relation fields set to a single element source will now show a search input by default. ([#17497](https://github.com/craftcms/cms/pull/17497))
- Link fields’ condition rules now have an “is of type” operator. ([#17277](https://github.com/craftcms/cms/pull/17277))
- Link fields now allow URLs without TLDs. ([#17450](https://github.com/craftcms/cms/issues/17450))
- Content previews for Plain Text fields are now shown in a fixed-width font if “Use a monospaced font” is enabled. ([#17447](https://github.com/craftcms/cms/pull/17447))
- Read-only relational fields now display element chips/cards more consistently with editable fields. ([#17146](https://github.com/craftcms/cms/discussions/17146))
- Added the “Notification Position” and “Sideout Position” user preferences. ([#17169](https://github.com/craftcms/cms/pull/17169))
- Button Group, Dropdown, and Radio Buttons fields now display their selected option’s icon/color within field previews. ([#17178](https://github.com/craftcms/cms/discussions/17178))
- Improved the wording of validation errors caused by relational fields’ “Validate related [type]” settings. ([#9960](https://github.com/craftcms/cms/discussions/9960))
- URL chips within Link fields are now truncated if wider than the container, and have a “Copy URL” action. ([#17339](https://github.com/craftcms/cms/pull/17339))
- Users with “Moderate users” permission can now send activation emails. ([#17362](https://github.com/craftcms/cms/pull/17362))
- Source headings within element indexes are now collapsible. ([#17226](https://github.com/craftcms/cms/pull/17226))
- Element condition builders now show condition rules for custom fields with duplicate names. ([#17361](https://github.com/craftcms/cms/pull/17361))

### Accessibility
- The Crop tool within the Image Editor is now screen reader and keyboard accessible. ([#17358](https://github.com/craftcms/cms/pull/17358))
- Lightswitches now have a checkmark icon when turned on, and improved styling. ([#17492](https://github.com/craftcms/cms/pull/17492)) 

### Administration
- Added the “Content Block” field type. ([#17424](https://github.com/craftcms/cms/pull/17424))
- Matrix fields’ entry type selections can now be grouped. ([#17425](https://github.com/craftcms/cms/pull/17425))
- Matrix fields with more than five entry types now show a search input within entry creation menus. ([#17425](https://github.com/craftcms/cms/pull/17425))
- Relation fields set to a single element source now have a “Show the search input” setting. ([#17497](https://github.com/craftcms/cms/pull/17497))
- Icon fields now expose the Font Awesome icon styles supported by the selected icon. ([#17419](https://github.com/craftcms/cms/pull/17419))
- Icon fields now have a “GraphQL Mode” setting, with “Full data” and “Name only” options. ([#17419](https://github.com/craftcms/cms/pull/17419))
- It’s now possible to customize the thumbnail alignment within element cards. ([#17193](https://github.com/craftcms/cms/pull/17193))
- Assets and Categories fields no longer have “Show the site menu” settings. ([#17156](https://github.com/craftcms/cms/issues/17156))
- Entry type edit pages now have a “Save as a new entry type” action. ([#15977](https://github.com/craftcms/cms/discussions/15977))
- Entry types can now have descriptions, which manifest as info icons within entry type chips. ([#17483](https://github.com/craftcms/cms/pull/17483))
- Added the “Delete entries for site” and “Delete other users’ entries for site” user permissions, for sections with a propagation method set to “Let each entry choose which sites it should be saved to”. ([#17313](https://github.com/craftcms/cms/pull/17313))
- Entry action menus now have “Entry type settings” and “Section settings” actions, for admin users on environments that allow admin changes. ([#10112](https://github.com/craftcms/cms/discussions/10112), [#17438](https://github.com/craftcms/cms/discussions/17438))
- “Field” condition rules for entry conditions now include an “is empty” operator.
- Address conditions can now have a “Field” rule. ([#17502](https://github.com/craftcms/cms/discussions/17502))
- The `accessibilityDefaults` config setting can now contain `notificationPosition` and `slideoutPosition` keys. ([#17169](https://github.com/craftcms/cms/pull/17169))
- The full suite of Font Awesome icons is now available to Icons fields. ([#17440](https://github.com/craftcms/cms/issues/17440))

### Development
- Added `<handle>Entry` GraphQL queries for each Single section, which resolve to the single entry within them. ([#17278](https://github.com/craftcms/cms/issues/17278))  
- GraphQL requests now return error messages for client-safe exceptions, even if Dev Mode is disabled. ([#17504](https://github.com/craftcms/cms/pull/17504))

### Extensibility
- Element edit pages now support being passed a hashed `returnUrl` query string param. ([#17137](https://github.com/craftcms/cms/discussions/17137))
- Added `craft\base\Describable`.
- Added `craft\base\Element::EVENT_RENDER`. ([#17188](https://github.com/craftcms/cms/discussions/17188))
- Added `craft\base\Element::partialTemplatePathCandidates()`.
- Added `craft\base\ElementInterface::getGeneratedFieldValues()`.
- Added `craft\base\ElementInterface::render()`.
- Added `craft\base\ElementInterface::setGeneratedFieldValues()`.
- Added `craft\base\Field::RESERVED_HANDLES`.
- Added `craft\base\FieldInterface::showStatus()`.
- Added `craft\elements\Asset::setMimeType()`.
- Added `craft\elements\ContentBlock`.
- Added `craft\elements\db\ContentBlockQuery`.
- Added `craft\events\RenderElementEvent`. ([#`17188`](https://github.com/craftcms/cms/discussions/17188))
- Added `craft\fieldlayoutelements\BaseField::showStatus()`.
- Added `craft\fields\BaseRelationField::$showSearchInput`.
- Added `craft\fields\BaseRelationField::canShowSiteMenu()`.
- Added `craft\fields\BaseRelationField::hasSelectionCondition()`.
- Added `craft\fields\BaseRelationField::showSearchInput()`.
- Added `craft\fields\conditions\GeneratedFieldConditionRule`.
- Added `craft\fields\conditions\LinkFieldConditionRule`.
- Added `craft\fields\data\IconData`.
- Added `craft\fields\data\OptionData::$color`.
- Added `craft\fields\data\OptionData::$icon`.
- Added `craft\gql\arguments\elements\ContentBlock`.
- Added `craft\gql\interfaces\elements\ContentBlock`.
- Added `craft\gql\resolvers\elements\ContentBlock`.
- Added `craft\gql\types\IconData`.
- Added `craft\gql\types\elements\ContentBlock`.
- Added `craft\gql\types\generators\ContentBlock`.
- Added `craft\gql\types\generators\IconDataType`.
- Added `craft\gql\types\input\ContentBlock`.
- Added `craft\helpers\Cp::buttonGroupFieldHtml()`.
- Added `craft\helpers\Cp::buttonGroupHtml()`.
- Added `craft\helpers\Cp::editableTableHtml()`.
- Added `craft\helpers\Cp::generatedFieldsTableHtml()`.
- Added `craft\helpers\ElementHelper::isMultiSite()`.
- Added `craft\models\EntryType::$description`.
- Added `craft\models\EntryType::$group`.
- Added `craft\models\FieldLayout::getCardThumbAlignment()`.
- Added `craft\models\FieldLayout::getGeneratedFieldByUid()`.
- Added `craft\models\FieldLayout::getGeneratedFields()`.
- Added `craft\models\FieldLayout::resetUids()`.
- Added `craft\models\FieldLayout::setCardThumbAlignment()`.
- Added `craft\models\FieldLayout::setGeneratedFields()`.
- Added `craft\records\ContentBlock`.
- Added `craft\services\Gql::defineContentArgumentsForGeneratedFields()`.
- Added `craft\web\Request::getValidatedQueryParam()`.
- `craft\elements\Asset::getMimeType()` now returns the file’s actual MIME type (rather than the MIME type associated with the file’s extension), for locally-stored assets. ([#17254](https://github.com/craftcms/cms/pull/17254))
- `craft\fields\data\ColorData` now extends `craft\base\Model` and includes `blue`, `green`, `hex`, `luma`, `red`, and `rgb` attributes in its array keys. ([#17265](https://github.com/craftcms/cms/issues/17265))
- `craft\services\Assets::replaceAssetFile()` now has a `$mimeType` argument.
- `craft\services\Users::saveUserPhoto()` now has a `$mimeType` argument.
- `craft\validators\HandleValidator` now supports `validateValue()`.
- Added the `buttonGroup` and `buttonGroupField` macros to the `_includes/forms.twig` template.
- Added the `_includes/forms/buttonGroup.twig` template.
- The `_layouts/cp.twig` template now supports passing an `actionButton` variable. ([#17423](https://github.com/craftcms/cms/pull/17423))
- `Craft.CpScreenSlideout` now supports overriding the `closeOnEsc`, `closeOnShadeClick`, `containerElement`, and `containerAttributes` settings. Slideouts with a non-`<form>` container element won’t get a “Save” button, and the close button will be labelled “Close” rather than “Cancel”. ([#13593](https://github.com/craftcms/cms/discussions/13593))
- `Craft.EntryTypeSelectInput` now triggers an `applySettings` event. ([#17387](https://github.com/craftcms/cms/pull/17387))
- Deprecated `craft\web\assets\picturefill\PicturefillAsset`. ([#17344](https://github.com/craftcms/cms/pull/17344))
- Deprecated `craft\elements\db\ElementQuery::customFields()`.
- Improved control panel CSS variable names. ([#17465](https://github.com/craftcms/cms/pull/17465))

### System
- Email verification links now show a form with a “Verify” button, which must be submitted before the email address is actually verified. ([#17392](https://github.com/craftcms/cms/pull/17392))
- Requests with user verification codes are now redirected to the login page by default. ([#17392](https://github.com/craftcms/cms/pull/17392))
- Assets now keep track of their MIME types when uploaded, improving the accuracy of `craft\elements\Asset::getMimeType()`. ([#17254](https://github.com/craftcms/cms/pull/17254))
- Reduced the number of SQL queries executed when fetching entries. ([#17326](https://github.com/craftcms/cms/discussions/17326))
