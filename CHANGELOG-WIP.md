# Release Notes for Craft CMS 5.8 (WIP)

### Content Management
- Matrix fields set to the “inline-editable blocks” view mode now have “Expand all blocks” and “Collapse all blocks” actions. ([#17141](https://github.com/craftcms/cms/pull/17141))
- Link fields’ condition rules now have an “is of type” operator. ([#17277](https://github.com/craftcms/cms/pull/17277))
- Read-only relational fields now display element chips/cards more consistently with editable fields. ([#17146](https://github.com/craftcms/cms/discussions/17146))
- Added the “Notification Position” and “Sideout Position” user preferences. ([#17169](https://github.com/craftcms/cms/pull/17169))
- Button Group, Dropdown, and Radio Buttons fields now display their selected option’s icon/color within field previews. ([#17178](https://github.com/craftcms/cms/discussions/17178))
- Improved the wording of validation errors caused by relational fields’ “Validate related [type]” settings. ([#9960](https://github.com/craftcms/cms/discussions/9960))

### Administration
- Assets and Categories fields no longer have “Show the site menu” settings. ([#17156](https://github.com/craftcms/cms/issues/17156))
- Entry type edit pages now have a “Save as a new entry type” action. ([#15977](https://github.com/craftcms/cms/discussions/15977))
- The `accessibilityDefaults` config setting can now contain `notificationPosition` and `slideoutPosition` keys. ([#17169](https://github.com/craftcms/cms/pull/17169))

### Extensibility
- Element edit pages now support being passed a hashed `returnUrl` query string param. ([#17137](https://github.com/craftcms/cms/discussions/17137))
- Added `craft\base\Element::EVENT_RENDER`. ([#17188](https://github.com/craftcms/cms/discussions/17188))
- Added `craft\base\Element::partialTemplatePathCandidates()`.
- Added `craft\base\ElementInterface::render()`.
- Added `craft\elements\Asset::setMimeType()`.
- Added `craft\events\RenderElementEvent`. ([#`17188`](https://github.com/craftcms/cms/discussions/17188))
- Added `craft\fields\BaseRelationField::canShowSiteMenu()`.
- Added `craft\fields\conditions\LinkFieldConditionRule`.
- Added `craft\fields\data\OptionData::$color`.
- Added `craft\fields\data\OptionData::$icon`.
- Added `craft\helpers\Cp::buttonGroupFieldHtml()`.
- Added `craft\helpers\Cp::buttonGroupHtml()`.
- Added `craft\models\FieldLayout::resetUids()`.
- Added `craft\web\Request::getValidatedQueryParam()`.
- `craft\elements\Asset::getMimeType()` now returns the file’s actual MIME type (rather than the MIME type associated with the file’s extension), for locally-stored assets. ([#17254](https://github.com/craftcms/cms/pull/17254))
- `craft\fields\data\ColorData` now extends `craft\base\Model` and includes `blue`, `green`, `hex`, `luma`, `red`, and `rgb` attributes in its array keys. ([#17265](https://github.com/craftcms/cms/issues/17265))
- `craft\services\Assets::replaceAssetFile()` now has a `$mimeType` argument.
- `craft\services\Users::saveUserPhoto()` now has a `$mimeType` argument.
- Added the `buttonGroup` and `buttonGroupField` macros to the `_includes/forms.twig` template.
- Added the `_includes/forms/buttonGroup.twig` template.
- `Craft.CpScreenSlideout` now supports overriding the `closeOnEsc`, `closeOnShadeClick`, `containerElement`, and `containerAttributes` settings. Slideouts with a non-`<form>` container element won’t get a “Save” button, and the close button will be labelled “Close” rather than “Cancel”. ([#13593](https://github.com/craftcms/cms/discussions/13593))

### System
- Assets now keep track of their MIME types when uploaded, improving the accuracy of `craft\elements\Asset::getMimeType()`. ([#17254](https://github.com/craftcms/cms/pull/17254))
