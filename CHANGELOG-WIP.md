# Release Notes for Craft CMS 5.7 (WIP)

### Content Management
- Removed the “Always show focus rings” user accessibility preference. ([#16585](https://github.com/craftcms/cms/pull/16585))

### Accessibility
- When a modal or slideout is triggered from a disclosure menu, focus is now set to the menu button when the modal/slideout is closed. ([#16587](https://github.com/craftcms/cms/pull/16587))

### Administration
- The email settings page now shows a “Test” button when `allowAdminChanges` is disabled. ([#16508](https://github.com/craftcms/cms/discussions/16508))
- Added the `--batch-size` option for `resave/*` commands. ([#16586](https://github.com/craftcms/cms/issues/16586))

### Extensibility
- Global nav items and breadcrumbs can now have `aria-label` attributes via an `ariaLabel` property.
- Added `craft\fields\data\ColorData::$label`. ([#16492](https://github.com/craftcms/cms/pull/16492))

### System
- The `changedattributes` and `changedfields` tables are now cleaned up during garbage collection. ([#16531](https://github.com/craftcms/cms/pull/16531))
- The `resourcepaths` table is now truncated when clearing control panel resources, via the Caches utility or the `clear-caches/cp-resources` command. ([#16514](https://github.com/craftcms/cms/issues/16514))
