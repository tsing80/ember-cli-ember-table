import Ember from 'ember';
import StyleBindingsMixin from 'ember-cli-ember-table/mixins/style-bindings-mixin';

export default Ember.View.extend(StyleBindingsMixin, {
  init: function() {
    this._super();
    this.contentPathDidChange();
    return this.contentDidChange();
  },
  row: Ember.computed.alias('parentView.row'),
  column: Ember.computed.alias('content'),
  width: Ember.computed.alias('column.columnWidth'),
  contentDidChange: function() {
    return this.notifyPropertyChange('cellContent');
  },
  contentPathWillChange: (function() {
    var contentPath;
    contentPath = this.get('column.contentPath');
    if (contentPath) {
      return this.removeObserver("row." + contentPath, this, this.contentDidChange);
    }
  }).observesBefore('column.contentPath'),
  contentPathDidChange: (function() {
    var contentPath;
    contentPath = this.get('column.contentPath');
    if (contentPath) {
      return this.addObserver("row." + contentPath, this, this.contentDidChange);
    }
  }).observesBefore('column.contentPath'),
  cellContent: Ember.computed('row.isLoaded', 'column', function(key, value) {
    var column, row;
    row = this.get('row');
    column = this.get('column');
    if (!(row && column)) {
      return;
    }
    if (arguments.length === 1) {
      value = column.getCellContent(row);
    } else {
      column.setCellContent(row, value);
    }
    return value;
  })
});