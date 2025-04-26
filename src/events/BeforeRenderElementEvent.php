<?php
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license https://craftcms.github.io/license/
 */

namespace craft\events;

use craft\base\Element;

/**
 * Asset event class.
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since 5.7.5
 */
class BeforeRenderElementEvent extends CancelableEvent
{
    /**
     * @var Element The element associated with the event.
     */
    public Element $element;

    /**
     * @var array Additional variables to be passed to the template
     */
    public array $variables;

    /**
     * @var array Array of template paths to check for partials
     */
    public array $templates;

    /**
     * @var string The output of the event
     */
    public string $output = '';
}
