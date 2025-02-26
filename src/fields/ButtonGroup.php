<?php
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license https://craftcms.github.io/license/
 */

namespace craft\fields;

use Craft;
use craft\base\ElementInterface;
use craft\base\SortableFieldInterface;
use craft\fields\data\SingleOptionFieldData;
use craft\helpers\Cp;
use craft\helpers\Html;

/**
 * RadioButtons represents a Radio Buttons field.
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since 3.0.0
 */
class ButtonGroup extends BaseOptionsField implements SortableFieldInterface
{
    /**
     * @inheritdoc
     */
    protected static bool $optionIcons = true;

    /**
     * @inheritdoc
     */
    public static function displayName(): string
    {
        return Craft::t('app', 'Button Group');
    }

    /**
     * @inheritdoc
     */
    public static function icon(): string
    {
        return 'hand-pointer';
    }

    /**
     * @inheritdoc
     */
    public function useFieldset(): bool
    {
        return true;
    }

    /**
     * @inheritdoc
     */
    protected function inputHtml(mixed $value, ?ElementInterface $element, bool $inline): string
    {
        return $this->_inputHtml($value, $element, false);
    }

    /**
     * @inheritdoc
     */
    public function getStaticHtml(mixed $value, ElementInterface $element): string
    {
        return $this->_inputHtml($value, $element, true);
    }

    private function _inputHtml(SingleOptionFieldData $value, ?ElementInterface $element, bool $static): string
    {
        /** @var SingleOptionFieldData $value */
        if (!$value->valid) {
            Craft::$app->getView()->setInitialDeltaValue($this->handle, null);
        }

        $id = $this->getInputId();

        $html = Html::beginTag('section', [
            'id' => $id,
            'class' => ['btngroup', 'btngroup--exclusive'],
            'aria' => [
                'labelledby' => $this->getLabelId(),
            ],
        ]);

        $value = $this->encodeValue($value);

        foreach ($this->translatedOptions(true, $value, $element) as $option) {
            $selected = $option['value'] === $value;
            $labelHtml = Html::encode($option['label']);
            if (!empty($option['icon'])) {
                $labelHtml = Html::beginTag('div', ['class' => ['flex', 'flex-inline']]) .
                    Html::tag('div', Cp::iconSvg($option['icon']), [
                        'class' => ['cp-icon', 'small'],
                    ]) .
                    Html::tag('div', $labelHtml) .
                    Html::endTag('div');
            }
            $html .= Cp::buttonHtml([
                'labelHtml' => $labelHtml,
                'type' => 'button',
                'class' => array_filter([
                    $selected ? 'active' : null,
                ]),
                'disabled' => $static,
                'attributes' => [
                    'aria' => [
                        'pressed' => $selected ? 'true' : false,
                    ],
                    'data' => [
                        'value' => $option['value'],
                    ],
                ],
            ]);
        }

        $html .= Html::endTag('section') . // .btngroup
            Html::hiddenInput($this->handle, $value, [
                'id' => "{$id}-input",
            ]);

        $view = Craft::$app->getView();
        $view->registerJsWithVars(fn($id) => <<<JS
(() => {
  new Craft.Listbox($('#' + $id), {
    onChange: (selectedOption) => {
      $('#' + $id + '-input').val(selectedOption.data('value'));
    },
  });
})();
JS, [
            $view->namespaceInputId($id),
        ]);

        return $html;
    }

    /**
     * @inheritdoc
     */
    protected function optionsSettingLabel(): string
    {
        return Craft::t('app', 'Radio Button Options');
    }
}
