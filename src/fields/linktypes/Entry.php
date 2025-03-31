<?php
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license https://craftcms.github.io/license/
 */

namespace craft\fields\linktypes;

use Craft;
use craft\elements\Entry as EntryElement;
use craft\helpers\Cp;
use craft\models\Section;
use Illuminate\Support\Collection;

/**
 * Entry link type.
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since 5.3.0
 */
class Entry extends BaseElementLinkType
{

    /**
     * @var bool Whether to show Entries for Sections the user doesn’t have permission to view.
     * @since 5.x
     */
    public bool $showUnpermittedSections = true;

    protected static function elementType(): string
    {
        return EntryElement::class;
    }

    /**
     * @inheritdoc
     */
    protected function getShowUnpermittedSettingHtml(): ?string
    {
        return Cp::lightswitchFieldHtml([
            'label' => Craft::t('app', 'Show unpermitted sections'),
            'instructions' => Craft::t('app', 'Whether to show sections that the user doesn’t have permission to view.'),
            'id' => 'showUnpermittedSections',
            'name' => 'showUnpermittedSections',
            'on' => $this->showUnpermittedSections,
        ]);
    }

    protected function availableSourceKeys(): array
    {
        $sources = [];
        $sections = Craft::$app->getEntries()->getAllSections();
        $sites = Craft::$app->getSites()->getAllSites();
        $showSingles = false;

        foreach ($sections as $section) {
            if ($section->type === Section::TYPE_SINGLE) {
                $showSingles = true;
            } else {
                $sectionSiteSettings = $section->getSiteSettings();
                foreach ($sites as $site) {
                    if (isset($sectionSiteSettings[$site->id]) && $sectionSiteSettings[$site->id]->hasUrls) {
                        $sources[] = "section:$section->uid";
                        break;
                    }
                }
            }
        }

        $sources = array_values(array_unique($sources));

        if ($showSingles) {
            array_unshift($sources, 'singles');
        }

        if (!empty($sources)) {
            array_unshift($sources, '*');
        }

        return $sources;
    }

    /**
     * @inerhitdoc
     */
    protected function elementSelectConfig(): array
    {
        $config = parent::elementSelectConfig();

        if(! $this->showUnpermittedSections) {
            $sourceKeys = $this->sources ?? Collection::make($this->availableSources())
                ->map(fn(array $source) => $source['key'])
                ->all();
            $userService = Craft::$app->getUser();
            $config['sources'] = Collection::make($sourceKeys)
                ->filter(function(string $source) use ($userService) {
                    // If it's the wildcard, let it through
                    if ($source === '*') {
                        return true;
                    }
                    // Only show it if they have permission to view it
                    $sectionUid = explode(':', $source)[1];
                    return $userService->checkPermission("viewEntries:$sectionUid");
                })
                ->all();
        }

        return $config;
    }
}
