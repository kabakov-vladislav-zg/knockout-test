import ko from 'knockout';
import AppHtml from './app.html';

import './components/reorderable-list/reorderable-list.js';

class ListViewModel {
  constructor() {
    this.categories = [
      {
        name: 'Обязательные для всех',
        subcategories: [
          'Паспорт',
          'ИНН',
        ]
      },
      {
        name: 'Обязательные для трудоустройства',
        subcategories: [
          'Трудовой договор',
        ]
      },
      {
        name: 'Специальные',
        subcategories: [
          'Специальные 1',
          'Специальные 2',
          'Специальные 3',
        ]
      },
    ];
  }
}

ko.components.register('app', {
  viewModel: ListViewModel,
  template: AppHtml
});
