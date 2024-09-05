import ko from 'knockout';
import reorderableListItemHtml from './reorderable-list-item.html';
import './reorderable-list-item.css';

import '../list-item/list-item.js';

class ReorderableListItemViewModel {
  constructor({ data, index, drag }) {
    const self = this;

    self.name = data.name;
    self.subcategories = data.subcategories;

    self.index = index;
    self.drag = drag;

    self.listElem = null;
    self.listElemHeight = null;

    self.open = ko.observable(false);
    self.transitionStyle = ko.observable(null);

    self.getPosition = (index2 = null) => {
      const position = [self.index()];
      if (index2 !== null) {
        position.push(index2());
      }
      return JSON.stringify(position);
    }

    const onclose = ({ target }) => {
      if (target === self.listElem) {
        self.transitionStyle({ height: 'auto' });
        self.listElem.removeEventListener('transitionend', onclose);
        self.open(false);
        self.listElem = null;
        self.listElemHeight = null;
      }
    };

    const onopen = ({ target }) => {
      if (target === self.listElem) {
        self.transitionStyle({ height: 'auto' });
        self.listElem.removeEventListener('transitionend', onopen);
        self.listElemHeight = null;
      }
    };

    self.toggle = () => {
      if (self.listElemHeight) {
        self.listElem.removeEventListener('transitionend', onclose);
        self.transitionStyle({ height: self.listElemHeight });
        self.listElem.addEventListener('transitionend', onopen);
      } else if (self.open()) {
        self.listElemHeight = getComputedStyle(self.listElem).height;
        self.transitionStyle({ height: self.listElemHeight });
        requestAnimationFrame(() => {
          self.listElem.addEventListener('transitionend', onclose);
          self.transitionStyle({ height: 0 });
        });
      } else {
        self.open(true);
      }
    };

    self.onListComplete = (elem) => {
      self.listElem = elem;
      const height = getComputedStyle(elem).height;
      self.transitionStyle({ height: 0 });
      requestAnimationFrame(() => {
        self.transitionStyle({ height });
      });
      self.listElem.addEventListener('transitionend', onopen);
    };
  }
}

ko.components.register('reorderable-list-item', {
  viewModel: ReorderableListItemViewModel,
  template: reorderableListItemHtml
});