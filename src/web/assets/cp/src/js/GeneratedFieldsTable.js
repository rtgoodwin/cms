/** global: Craft */
/** global: Garnish */
/** global: $ */
/** global: jQuery */

Craft.GeneratedFieldsTable = Craft.EditableTable.extend({
  createRowObj: function ($tr) {
    return new Craft.GeneratedFieldsTable.Row(this, $tr);
  },
});

Craft.GeneratedFieldsTable.Row = Craft.EditableTable.Row.extend({
  init: function (table, tr) {
    this.base(table, tr);

    const $nameInput = this.$tr.find('> td:first-child > textarea');
    const $handleInput = this.$tr.find('> td:nth-child(2) > textarea');

    if (!$nameInput.val()) {
      new Craft.HandleGenerator($nameInput, $handleInput);
    }
  },
});
