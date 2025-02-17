<?php
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license https://craftcms.github.io/license/
 */

use craft\elements\Asset;
use craft\elements\Entry;
use craft\elements\User;
use craft\fields\Number;
use craft\fields\PlainText;

return [
    [
        'uid' => 'field-layout-1000----------------uid',
        // Because User elements fetch layout by type
        'type' => User::class,
        'tabs' => [
            [
                'name' => 'Tab 1',
                'fields' => [
                    [
                        'name' => 'Short Biography',
                        'handle' => 'shortBio',
                        'type' => PlainText::class,
                        'required' => true,
                    ],
                ],
            ],
        ],
    ],
    [
        'uid' => 'field-layout-1001----------------uid',
        'type' => Asset::class,
        'tabs' => [
            [
                'name' => 'Tab 1',
                'fields' => [
                    [
                        'name' => 'Image description',
                        'handle' => 'imageDescription',
                        'type' => PlainText::class,
                        'required' => true,
                    ],
                    [
                        'name' => 'Volume and mass',
                        'handle' => 'volumeAndMass',
                        'type' => PlainText::class,
                        'required' => true,
                    ],
                ],
            ],
        ],
    ],
    [
        'uid' => 'field-layout-1002----------------uid',
        'type' => Entry::class,
        'tabs' => [
            [
                'name' => 'Tab 1',
                'fields' => [
                    // PLAIN TEXT FIELD
                    [
                        'uid' => 'field-1001-----------------------uid',
                        'name' => 'Plain Text Field',
                        'handle' => 'plainTextField',
                        'type' => PlainText::class,
                        'required' => true,
                    ],

                    // NUMBER FIELD
                    [
                        'uid' => 'field-1002-----------------------uid',
                        'name' => 'Number Field',
                        'handle' => 'numberField',
                        'type' => Number::class,
                        'required' => true,
                    ],
                ],
            ],
        ],
    ],
];
