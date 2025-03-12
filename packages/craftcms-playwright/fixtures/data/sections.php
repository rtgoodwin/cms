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
];
