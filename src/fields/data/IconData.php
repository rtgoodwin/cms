<?php
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license https://craftcms.github.io/license/
 */

namespace craft\fields\data;

use craft\base\Serializable;

/**
 * Class IconData
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since 5.8.0
 */
class IconData implements Serializable
{
    /**
     * @var array|null
     */
    public ?array $family = null;

    /**
     * @var string|null
     */
    public ?string $value = null;

    /**
     * Constructor
     *
     * @param string|null $value
     * @param array|null $family
     */
    public function __construct(?string $value, ?array $family = null)
    {
        $this->value = $value;
        $this->family = $family;
    }

    /**
     * @return string
     */
    public function __toString(): string
    {
        return $this->getValue();
    }

    /**
     * @inheritdoc
     */
    public function serialize(): mixed
    {
        return $this->getValue();
    }

    /**
     * Returns the array of families this icon belongs to.
     *
     * @return ?array
     */
    public function getFamily(): ?array
    {
        return $this->family;
    }

    /**
     * Returns the icon field value.
     */
    public function getValue(): string
    {
        return $this->value;
    }
}
