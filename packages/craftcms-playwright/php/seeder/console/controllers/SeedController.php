<?php

namespace modules\seeder\console\controllers;

use craft\console\Controller;
use yii\console\ExitCode;
use yii\test\FixtureTrait;

/**
 * Seed controller
 */
class SeedController extends Controller
{
    use FixtureTrait;

    /**
     * @var string[] The name the fixtures that should be seeded
     */
    public array $fixtureNames = [];

    public $defaultAction = 'index';

    public function options($actionID): array
    {
        $options = parent::options($actionID);
        switch ($actionID) {
            case 'index':
                $options[] = 'fixtureNames';
                break;
        }
        return $options;
    }

    /**
     * seeder/seed command
     */
    public function actionIndex(): int
    {
        $fixtures = $this->createFixtures($this->fixtureNames);
        $this->loadFixtures($fixtures);

        return ExitCode::OK;
    }
}
