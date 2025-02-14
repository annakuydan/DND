import InitTiket from './tiket';

export default class InitForm {
  constructor() {
    this.container = null;
    this.form = document.createElement('form');
  }

  init() {
    this.form.setAttribute('novalidate', 'novalidate');
    this.form.setAttribute('id', 'item-form');

    this.form.innerHTML = `
       <textarea id="text" class="input" name="text" rows="3" cols="33" 
       placeholder="text" autocomplete="off"></textarea>
       <div class='button-container'>
         <button type="submit" class="btnSubmit">Подтверждаю</button>
         <button class="btnReset">X</button>
       </div>`;
    this.container.append(this.form);
    this.formElements = [...this.form.elements];
  }

  bindToDOM(container) {
    this.container = container;
    this.init();
    this.events();
  }

  events() {
    const btnReset = this.form.querySelector('.btnReset');

    btnReset.addEventListener('click', () => this.closeForm()); // 2

    this.form.addEventListener('submit', (e) => this.onSubmit(e)); // 2
  }

  closeForm() {
    this.form.parentNode.removeChild(this.form);
  }

  onSubmit(e) {
    e.preventDefault();
    const formData = {};
    this.formElements.forEach((el) => {
      if (!el.name) {
        return;
      }
      formData[el.name] = el.value;
    });
    const inittiket = new InitTiket(this.container.querySelector('.tikets'));

    inittiket.bindToDom(formData);

    this.closeForm();

    if (!localStorage.getItem('columns')) {
      localStorage.setItem('columns', JSON.stringify({}));
    }

    const columnsLocal = JSON.parse(localStorage.columns);
    if (!Object.prototype.hasOwnProperty.call(columnsLocal, this.container.dataset.id)) {
      columnsLocal[this.container.dataset.id] = [];
    }

    columnsLocal[this.container.dataset.id].push(formData);

    localStorage.setItem('columns', JSON.stringify(columnsLocal));
  }
}
