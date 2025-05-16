<?php
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license https://craftcms.github.io/license/
 */

return [
    [
        // Test Sorting
        'id' => '1000',
        'sectionId' => '1000',
        'siteId' => '1',
        'hasUrls' => false,
        'uriFormat' => null,
        'template' => null,
        'enabledByDefault' => true,
    ],
    [
        // Test Matrix
        'id' => '1001',
        'sectionId' => '1001',
        'siteId' => '1',
        'hasUrls' => false,
        'uriFormat' => null,
        'template' => null,
        'enabledByDefault' => true,
    ],
    [
        // Test Init UI Elements
        'id' => '1002',
        'sectionId' => '1002',
        'siteId' => '1',
        'hasUrls' => true,
        'uriFormat' => 'test-init-ui-elements/{slug}',
        'template' => null,
        'enabledByDefault' => true,
    ],
];
