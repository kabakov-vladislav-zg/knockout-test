import ko from 'knockout';
import listItemHtml from './list-item.html';
import './list-item.css';

class ListItemViewModel {
  constructor({ nested, name, toggle, drag, open, position }) {
    const self = this;

    self.name = name;
    self.nested = nested;
    self.toggle = toggle;
    self.drag = drag;
    self.open = open;
    self.position = position;
    self.itemElem = null;

    self.onItemComplete = (elem) => {
      self.itemElem = elem;
    };
  }

  ondragstart() {
    return false;
  };
}

ko.components.register('list-item', {
  viewModel: ListItemViewModel,
  template: listItemHtml
});