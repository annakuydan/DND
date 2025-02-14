import dnd from './dnd';

export default class InitTiket {
  constructor(container) {
    this.container = container;
    this.tiketgroup = null;
  }

  bindToDom(o) {
    this.tiketgroup = document.createElement('div');
    this.tiketgroup.classList.add('tiket-group');
    this.tiketgroup.setAttribute('data-id', o.id);
    this.tiketgroup.setAttribute('data-type', 'item');
    this.tiketgroup.setAttribute('draggable', 'true');
    this.tiketgroup.innerHTML = `
       <div class = "tiket"></div>
       <button class="closeBtn" data-toggle="close">X</button>`;
    this.tiketgroup.querySelector('.tiket').innerText = o.text;
    this.container.append(this.tiketgroup);
    this.closeTiketBtn();
  }

  closeTiketBtn() {
    const closeBtn = this.tiketgroup.querySelector('.closeBtn');

    this.tiketgroup.addEventListener('mouseover', () => {
      closeBtn.classList.add('hidden');
    });

    this.tiketgroup.addEventListener('mouseout', () => {
      closeBtn.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => {
      this.tiketgroup.parentNode.removeChild(this.tiketgroup);
      const columsLocal = JSON.parse(localStorage.columns);
      const key = this.container.closest('.column').dataset.id;
      const index = columsLocal[key].findIndex((tiketgroup) => tiketgroup.id === +this.tiketgroup.dataset.id);
      columsLocal[key].splice(index, 1);
      localStorage.setItem('columns', JSON.stringify(columsLocal));
    });
    dnd(this.container.closest('.columns'), this.tiketgroup);
  }
}
