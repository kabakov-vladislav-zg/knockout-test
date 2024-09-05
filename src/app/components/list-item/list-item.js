import ko from 'knockout';
import listItemHtml from './list-item.html';
import './list-item.css';

class ListItemViewModel {
  constructor({ nested, name, toggle, drag, open }) {
    this.name = name;
    this.nested = nested;
    this.toggle = toggle;
    this.drag = drag;
    this.open = open;
  }
}

ko.components.register('list-item', {
  viewModel: ListItemViewModel,
  template: listItemHtml
});