export default function dnd(columns, el) {
  function getCoords(elem) {
    const box = elem.getBoundingClientRect();
    return {
      top: box.top + window.scrollX,
      left: box.left + window.scrollX,
    };
  }
  const container = columns;
  const item = el;
  let draggedEl = null;
  let dataId = null;
  let wrapper = null;

  item.addEventListener('mousedown', (e) => {
    const coords = getCoords(item);
    const shiftX = e.pageX - coords.left;
    const shiftY = e.pageY - coords.top;

    function moveAt(evt) {
      item.style.left = `${evt.pageX - shiftX}px`;
      item.style.top = `${evt.pageY - shiftY}px`;
    }

    if (e.target.dataset.toggle !== 'close') {
      e.preventDefault();
      if (draggedEl) return;

      wrapper = document.createElement('div');
      wrapper.style.height = `${item.offsetHeight}px`;

      wrapper.style.backgroundColor = '#7b9bb1';
      item.parentElement.insertBefore(wrapper, item);

      dataId = e.target.closest('.column').dataset.id;
      draggedEl = e.target;

      item.classList.add('dragged');
      document.body.appendChild(item);

      moveAt(e);

      const mouseMoving = function (evt) {
        evt.preventDefault();
        if (!draggedEl) return;
        moveAt(evt);
      };

      container.addEventListener('mousemove', mouseMoving);

      container.addEventListener('mouseup', (evt) => {
        if (!draggedEl) return;

        wrapper.remove();

        const closest = document.elementFromPoint(evt.clientX, evt.clientY);

        const columsLocal = JSON.parse(localStorage.columns);
        const newColumn = closest.closest('.column');

        const newColumnId = newColumn.dataset.id;

        const index = columsLocal[dataId].findIndex((i) => i.id === +item.dataset.id);

        const todoLocal = columsLocal[dataId].splice(index, 1);

        if (closest.className !== 'tikets-container') {
          let itemsColumn = closest.closest('.tiket-group');

          if (itemsColumn) {
            /* eslint-disable */
						const center = itemsColumn.getBoundingClientRect().y + itemsColumn.getBoundingClientRect().height / 2;

						if (e.clientY > center) {
							if (itemsColumn.nextElementSibling !== null) {
								itemsColumn = itemsColumn.nextElementSibling;
							} else {
								return;
							}
						}

						itemsColumn.parentElement.insertBefore(item, itemsColumn);
						item.classList.remove('dragged');
						item.style.top = null;
						item.style.left = null;

						if (dataId === newColumnId) {
							/* eslint-disable */
							const indexBefore = columsLocal[dataId].findIndex((i) => i.id === +itemsColumn.dataset.id);
							columsLocal[dataId].splice(indexBefore, 0, todoLocal[0]);
						} else {
							const indexBefore = columsLocal[newColumnId].findIndex((i) => i.id === +itemsColumn.dataset.id);
							columsLocal[newColumnId].splice(indexBefore, 0, todoLocal[0]);
						}

					} else {
						return;
					}
				}

				if (closest.className === 'tikets-container') {
					/*if (!columsLocal.hasOwnProperty(newColumnId)) columsLocal[newColumnId] = [];*/
                    if (!Object.prototype.hasOwnProperty.call(columsLocal, newColumnId)) columsLocal[newColumnId] = [];
					if (todoLocal[0]) columsLocal[newColumnId].push(todoLocal[0]);

					item.classList.remove('dragged');
					container.removeEventListener('mousemove', mouseMoving);

					const columnItems = newColumn.querySelector('.tikets');
					columnItems.append(item);

					item.style.top = null;
					item.style.left = null;
				}
				localStorage.setItem('columns', JSON.stringify(columsLocal));
				draggedEl = null;
			});
		}
	});
}