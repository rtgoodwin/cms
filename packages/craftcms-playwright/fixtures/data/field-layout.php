<?php
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license https://craftcms.github.io/license/
 */

use craft\elements\Asset;
use craft\elements\Entry;
use craft\elements\User;
use craft\fields\Matrix;
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
                        'required' => false,
                    ],

                    // NUMBER FIELD
                    [
                        'uid' => 'field-1002-----------------------uid',
                        'name' => 'Number Field',
                        'handle' => 'numberField',
                        'type' => Number::class,
                        'required' => false,
                    ],
                ],
            ],
        ],
    ],
    [
        'uid' => 'field-layout-1003----------------uid',
        'type' => Entry::class,
        'tabs' => [
            [
                'name' => 'Tab 1',
                'fields' => [
                    // MATRIX FIELD IN CARDS MODE
                    [
                        'uid' => 'field-1003-----------------------uid',
                        'name' => 'Matrix Cards Field',
                        'handle' => 'matrixCardsField',
                        'type' => Matrix::class,
                        'required' => false,
                        'viewMode' => Matrix::VIEW_MODE_CARDS,
                        'entryTypes' => [
                            [
                                'uid' => 'entry-type-1000------------------uid',
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],
    [
        'uid' => 'field-layout-1004----------------uid',
        'type' => Entry::class,
        'tabs' => [
            [
                'name' => 'Tab 1',
                'fields' => [
                    // MATRIX FIELD IN ELEMENT INDEX MODE
                    [
                        'uid' => 'field-1004-----------------------uid',
                        'name' => 'Matrix Element Index Field',
                        'handle' => 'matrixElementIndexField',
                        'type' => Matrix::class,
                        'required' => false,
                        'viewMode' => Matrix::VIEW_MODE_INDEX,
                        'entryTypes' => [
                            [
                                'uid' => 'entry-type-1000------------------uid',
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],
    [
        'uid' => 'field-layout-1005----------------uid',
        'type' => Entry::class,
        'tabs' => [
            [
                'name' => 'Tab 1',
                'fields' => [
                    // MATRIX FIELD IN BLOCKS MODE
                    [
                        'uid' => 'field-1005-----------------------uid',
                        'name' => 'Matrix Blocks Field',
                        'handle' => 'matrixBlocksField',
                        'type' => Matrix::class,
                        'required' => false,
                        'viewMode' => Matrix::VIEW_MODE_BLOCKS,
                        'entryTypes' => [
                            [
                                'uid' => 'entry-type-1000------------------uid',
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],
];
