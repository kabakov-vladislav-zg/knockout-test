import ko from 'knockout';
import listItemHtml from './list-item.html';
import './list-item.css';

class ListItemViewModel {
  constructor({ nested, name }) {
    this.name = name;
    this.nested = nested;
  }
}

ko.components.register('list-item', {
  viewModel: ListItemViewModel,
  template: listItemHtml
});