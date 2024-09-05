import ko from 'knockout';
import reorderableListHtml from './reorderable-list.html';
import './reorderable-list.css';

import '../reorderable-list-item/reorderable-list-item.js';


class ReorderableListViewModel {
  constructor({ value }) {
    const self = this;

    self.categories = ko.observableArray(value.map(({ name, subcategories }) => {
      return { name, subcategories: ko.observableArray(subcategories)};
    }));

    const setPosition = (startPosition, currentPosition) => {
      const list = self.categories();
      const startCategory = list[startPosition[0]];
      if (startPosition.length === 1) {
        list.splice(startPosition[0], 1);
        list.splice(currentPosition[0], 0, startCategory);
      } else {
        const startSubcategory = startCategory.subcategories()[startPosition[1]];
        startCategory.subcategories.splice(startPosition[1], 1);
        list[currentPosition[0]].subcategories.splice(currentPosition[1], 0, startSubcategory);
      }
      console.log(list)
      self.categories(list);
    };

    self.drag = (elem, event) => {
      let target;
      const startPosition = JSON.parse(elem.dataset.position);
      let currentPosition = JSON.parse(elem.dataset.position);
      const last = startPosition.length - 1;
      const box = elem.getBoundingClientRect();
      let pageX = box.x;
      let pageY = box.y;
      const width = box.width;
      const centerX = box.x + box.width / 2;
      const offsetX = event.clientX - pageX;
      const offsetY = event.clientY - pageY;
      const newElem = elem.cloneNode(true);
      newElem.style.position = 'absolute';
      newElem.style.width = `${width}px`;
      newElem.style.top = `${pageY}px`;
      newElem.style.left = `${pageX}px`;
      newElem.classList.add('reorderable-list__dropable');
      document.body.append(newElem);

      const moveAt = (pageX, pageY) => {
        newElem.style.left = pageX - offsetX + 'px';
        newElem.style.top = pageY - offsetY + 'px';
      }

      const onMouseMove = (event) => {
        moveAt(event.pageX, event.pageY);
      
        newElem.style.visibility = 'hidden';
        const elemBelow = document.elementFromPoint(centerX, event.clientY);
        newElem.style.visibility = 'visible';
        if (!elemBelow) return;
        const isSameItem = (elemBelow.className === elem.className) || (elemBelow.className === 'reorderable-list-item__placeholder');
        if (!isSameItem) return;
        const position = JSON.parse(elemBelow.dataset.position);
        const sameItemBox = elemBelow.getBoundingClientRect();
        const sameItemCenter = sameItemBox.y + sameItemBox.height / 2;
        if (target) {
          target.remove();
        }
        target = document.createElement('div');
        target.className = 'reorderable-list__divider';
        currentPosition = position;
        if (event.clientY > sameItemCenter) {
          elemBelow.after(target);
          currentPosition[last] = position[last] + 1;
        } else {
          elemBelow.before(target);
          currentPosition[last] = position[last];
        }
      }

      document.addEventListener('pointermove', onMouseMove);
      document.addEventListener('pointerup', () => {
        document.removeEventListener('pointermove', onMouseMove);
        newElem.remove();
        if (target) {
          target.remove();
          setPosition(startPosition, currentPosition);
        }
      }, { once: true });
    }
  }
}

ko.components.register('reorderable-list', {
  viewModel: ReorderableListViewModel,
  template: reorderableListHtml
});