<?php
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license https://craftcms.github.io/license/
 */

return [
    [
        'id' => '1000',
        'name' => 'Test Sorting',
        'handle' => 'testSorting',
        'type' => 'channel',
        'enableVersioning' => false,
        'propagationMethod' => 'all',
        'uid' => 'section-1000---------------------uid',
        'entryTypes' => ['1000'],
    ],
    [
        'id' => '1001',
        'name' => 'Test Matrix',
        'handle' => 'testMatrix',
        'type' => 'channel',
        'enableVersioning' => false,
        'propagationMethod' => 'all',
        'uid' => 'section-1001---------------------uid',
        'entryTypes' => ['1001', '1002', '1003'],
    ],
    [
        'id' => '1002',
        'name' => 'Test Init UI Elements',
        'handle' => 'testInitUiElements',
        'type' => 'channel',
        'enableVersioning' => false,
        'propagationMethod' => 'all',
        'previewTargets' => [
            [
                'label' => 'Primary entry page',
                'refresh' => '1',
                'urlFormat' => '{url}',
            ],
        ],
        'uid' => 'section-1002---------------------uid',
        'entryTypes' => ['1005'],
    ],
];
