import ko from 'knockout';
import reorderableListHtml from './reorderable-list.html';
import './reorderable-list.css';

import '../reorderable-list-item/reorderable-list-item.js';

class ReorderableListViewModel {
  constructor(params) {
    this.categories = params.value;
    ko.observable
  }

  callback(...position) {
    console.log(position);
  }
}

ko.components.register('reorderable-list', {
  viewModel: ReorderableListViewModel,
  template: reorderableListHtml
});