import InitColumn from './column';

export default class Columns {
  constructor(container) {
    this.container = container;
    this.columns = document.querySelector('.columns');
  }

  bindToDOM() {
    this.InitColumns();
    this.container.append(this.columns);
  }

  InitColumns() {
    this.column1 = new InitColumn(this.columns);
    this.column2 = new InitColumn(this.columns);
    this.column3 = new InitColumn(this.columns);

    this.column1.bindToDOM({
      class: 'column1',
      title: 'TODO',
      id: '1',
    });
    this.column2.bindToDOM({
      class: 'column2',
      title: 'In progress',
      id: '2',
    });
    this.column3.bindToDOM({
      class: 'column3',
      title: 'Done',
      id: '3',
    });
  }
}
