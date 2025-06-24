<?php

namespace craft\migrations;

use craft\db\Migration;
use craft\db\Table;

/**
 * m250623_105031_entry_type_descriptions migration.
 */
class m250623_105031_entry_type_descriptions extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp(): bool
    {
        $this->addColumn(Table::ENTRYTYPES, 'description', $this->text()->after('handle'));
        $this->addColumn(Table::SECTIONS_ENTRYTYPES, 'description', $this->text()->after('handle'));
        return true;
    }

    /**
     * @inheritdoc
     */
    public function safeDown(): bool
    {
        echo "m250623_105031_entry_type_descriptions cannot be reverted.\n";
        return false;
    }
}
