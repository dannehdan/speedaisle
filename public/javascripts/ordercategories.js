const list = document.getElementById('categories-list');

const getMouseOffset = (event) => {
  const targetRect = event.target.getBoundingClientRect();
  const offset = {
    x: event.pageX - targetRect.left,
    y: event.pageY - targetRect.top
  };
  return offset;
}

const getElementVerticalCenter = (el) => {
  const rect = el.getBoundingClientRect();
  return (rect.bottom - rect.top) / 2;
}

function sortable(listEl, onUpdate) {
  let dragEl;
  
  function _onDragOver(event) {
    event.preventDefault();

    // console.log(event.dataTransfer);
    event.dataTransfer.dropEffect = 'move';
    const target = event.target;

    if (target && target !== dragEl && target.nodeName == 'SECTION') {
      const offset = getMouseOffset(event);
      const middleY = getElementVerticalCenter(event.target);

      listEl.insertBefore(dragEl, offset.y > middleY ? target.nextSibling : target);
    }
  }
  
  function _onDragEnd(event){
    event.preventDefault();
    
    dragEl.classList.remove('category-ghost');

    listEl.removeEventListener('dragover', _onDragOver, false);
    listEl.removeEventListener('dragend', _onDragEnd, false);
    
    onUpdate(dragEl);
  }
  
  listEl.addEventListener('dragstart', function (event){
    dragEl = event.target;

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('Text', dragEl.textContent);

    setTimeout(() => {
      dragEl.classList.add('category-ghost');
    }, 0);

    listEl.addEventListener('dragover', _onDragOver, false);
    listEl.addEventListener('dragend', _onDragEnd, false);
  }, false);
}

sortable(list, function (item) {
  console.log(`TODO: save new position of ${item.textContent} to the db`);
});