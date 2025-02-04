<?php

namespace modules\seeder;

use Craft;
use yii\base\Module as BaseModule;

/**
 * Seeder module
 *
 * @method static Seeder getInstance()
 */
class Seeder extends BaseModule
{
    public function init(): void
    {
        Craft::setAlias('@modules/seeder', __DIR__);

        // Set the controllerNamespace based on whether this is a console or web request
        if (Craft::$app->request->isConsoleRequest) {
            $this->controllerNamespace = 'modules\\seeder\\console\\controllers';
        }

        parent::init();

        // Defer most setup tasks until Craft is fully initialized
        Craft::$app->onInit(function() {
            $this->attachEventHandlers();
        });
    }

    private function attachEventHandlers(): void
    {
        // Register event handlers here ...
        // (see https://craftcms.com/docs/5.x/extend/events.html to get started)
    }
}
