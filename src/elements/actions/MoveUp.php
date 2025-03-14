<?php
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license https://craftcms.github.io/license/
 */

namespace craft\elements\actions;

use Craft;
use craft\base\ElementAction;
use craft\base\ElementInterface;

/**
 * Updates the sort order for the selected element
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since 5.7.0
 */
class MoveUp extends ElementAction
{
    /**
     * Constructor
     *
     * @param ElementInterface $owner The owner element
     * @param string $attribute The attribute name that nested elements are accessible by, from the owner element.
     */
    public function __construct(
        private readonly ElementInterface $owner,
        private readonly string $attribute,
        $config = [],
    ) {
        parent::__construct($config);
    }

    /**
     * @inheritdoc
     */
    public function getTriggerLabel(): string
    {
        return Craft::t('app', 'Move backward'); //up
    }

    /**
     * @inheritdoc
     */
    public function getTriggerHtml(): ?string
    {
        Craft::$app->getView()->registerJsWithVars(
            fn($type, $params) => <<<JS
(() => {
  new Craft.ElementActionTrigger({
    type: $type,
    bulk: false,
    validateSelection: (selectedItems, elementIndex) => {
      return (
        elementIndex.sortable && 
        selectedItems.parent().children().first().data('id') !== selectedItems.data('id')
      );
    },
    activate: (selectedItems, elementIndex) => {
      const selectedItemIndex = Object.values(elementIndex.view.getAllElements()).indexOf(selectedItems[0]);
      
      const data = Object.assign($params, {
          elementIds: elementIndex.getSelectedElementIds(),
          offset: selectedItemIndex - 1,
        });
      
      Craft.sendActionRequest('POST', 'nested-elements/reorder', {data})
      .then(({data}) => {
        Craft.cp.displayNotice(data.message);
        elementIndex.updateElements(true, true)
      })
      .catch(({response}) => {
        Craft.cp.displayError(response.data && response.data.error);
      });
    },
  });
})();
JS,
            [
                static::class,
                [
                    'ownerElementType' => get_class($this->owner),
                    'ownerId' => $this->owner->id,
                    'ownerSiteId' => $this->owner->siteId,
                    'attribute' => $this->attribute,
                ],
            ]);

        return null;
    }
}
