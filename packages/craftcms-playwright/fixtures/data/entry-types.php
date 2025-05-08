<?php
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license https://craftcms.github.io/license/
 */

return [
    [
        'id' => '1000',
        'fieldLayoutId' => null,
        'name' => 'With Plain Text and Number',
        'handle' => 'withPlainTextAndNumber',
        'titleFormat' => '{plainTextField}',
        'fieldLayoutUid' => 'field-layout-1002----------------uid',
        'uid' => 'entry-type-1000------------------uid',
    ],
    [
        'id' => '1001',
        'fieldLayoutId' => null,
        'name' => 'With Matrix in Cards mode',
        'handle' => 'withMatrixInCardsMode',
        // the title field doesn't actually show, doesn't get visibly added even when this runs in codeception,
        // but it's not a problem in codeception because the property exists and can be filled;
        // that's why we need to set titleFormat, so we can have some sort of default title
        'titleFormat' => 'Entry {id}',
        // and since we have and rely on titleFormat, we need to set hasTitleField, or it won't work properly
        'hasTitleField' => false,
        'fieldLayoutUid' => 'field-layout-1003----------------uid',
        'uid' => 'entry-type-1001------------------uid',
    ],
    [
        'id' => '1002',
        'fieldLayoutId' => null,
        'name' => 'With Matrix in Element Index mode',
        'handle' => 'withMatrixInElementIndexMode',
        // the title field doesn't actually show, doesn't get visibly added even when this runs in codeception,
        // but it's not a problem in codeception because the property exists and can be filled;
        // that's why we need to set titleFormat, so we can have some sort of default title
        'titleFormat' => 'Entry {id}',
        // and since we have and rely on titleFormat, we need to set hasTitleField, or it won't work properly
        'hasTitleField' => false,
        'fieldLayoutUid' => 'field-layout-1004----------------uid',
        'uid' => 'entry-type-1002------------------uid',
    ],
    [
        'id' => '1003',
        'fieldLayoutId' => null,
        'name' => 'With Matrix in Blocks mode',
        'handle' => 'withMatrixInBlocksMode',
        // the title field doesn't actually show, doesn't get visibly added even when this runs in codeception,
        // but it's not a problem in codeception because the property exists and can be filled;
        // that's why we need to set titleFormat, so we can have some sort of default title
        'titleFormat' => 'Entry {id}',
        // and since we have and rely on titleFormat, we need to set hasTitleField, or it won't work properly
        'hasTitleField' => false,
        'fieldLayoutUid' => 'field-layout-1005----------------uid',
        'uid' => 'entry-type-1003------------------uid',
    ],
    [
        'id' => '1004',
        'fieldLayoutId' => null,
        'name' => 'With Plain Text as Title',
        'handle' => 'withPlainTextAsTitle',
        // the title field doesn't actually show, doesn't get visibly added even when this runs in codeception,
        // but it's not a problem in codeception because the property exists and can be filled;
        // that's why we need to set titleFormat, so we can have some sort of default title
        'titleFormat' => '{plainTextField2}',
        // and since we have and rely on titleFormat, we need to set hasTitleField, or it won't work properly
        'hasTitleField' => false,
        'fieldLayoutUid' => 'field-layout-1006----------------uid',
        'uid' => 'entry-type-1004------------------uid',
    ],
];
