import ko from 'knockout';
import reorderableListHtml from './reorderable-list.html';
import './reorderable-list.css';

import '../reorderable-list-item/reorderable-list-item.js';

class ReorderableListViewModel {
  constructor(params) {
    const self = this;
    self.categories = ko.observableArray(params.value);

    self.drag = () => {
      console.log(1111);
    }
  }
}

ko.components.register('reorderable-list', {
  viewModel: ReorderableListViewModel,
  template: reorderableListHtml
});