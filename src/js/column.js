import InitTiket from './tiket';
import InitForm from './form';

export default class InitColumn {
  constructor(container) {
    this.container = container;
    this.column = null;
  }

  bindToDOM(o) {
    this.column = document.createElement('div');
    this.column.classList.add('column');
    this.column.classList.add('column-droppable');
    this.column.setAttribute('data-id', o.id);

    this.column.innerHTML = `
      <h3 class = "title">${o.title}</h3>
      <button class="btn"> + Добавить тикет</button>
     <div class="tikets-container" data-type = "column">
     <div class="tikets">
     </div>
     </div>
     <div class="form-container"></div>
     `;

    this.container.append(this.column);
    this.localColumn(o.id);
    this.addBtn();
  }

  addBtn() {
    const addBtn = this.column.querySelector('.btn');
    addBtn.addEventListener('click', () => this.addItem());
  }

  addItem() {
    if (!this.column.querySelector('form') && !document.querySelector('.dragged')) {
      const initForm = new InitForm();
      initForm.bindToDOM(this.column);
    }
  }

  localColumn(id) {
    if (localStorage.columns) {
      const columnsLocal = JSON.parse(localStorage.columns);
      if (columnsLocal) {
        if (columnsLocal[id]) {
          columnsLocal[id].forEach((el) => {
            const inittiket = new InitTiket(this.column.querySelector('.tikets'));
            inittiket.bindToDom(el);
          });
        }
      }
    }
  }
}
