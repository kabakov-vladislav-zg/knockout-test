import ko from 'knockout';
import reorderableListItemHtml from './reorderable-list-item.html';
import './reorderable-list-item.css';

class ReorderableListItemViewModel {
  constructor({ data, index }) {
    this.name = data.name;
    this.subcategories = data.subcategories;

    this.index = index;
  }
}

ko.components.register('reorderable-list-item', {
  viewModel: ReorderableListItemViewModel,
  template: reorderableListItemHtml
});