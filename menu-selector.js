// Menú CRT navegable con teclado y selector visual tipo terminal
window.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('#crt-menu ul');
  if (!menu) return;
  let items = Array.from(menu.querySelectorAll('li'));
  let selected = 0;

  // Elimina los estilos de lista para quitar el punto
  menu.style.listStyle = 'none';
  items.forEach(li => li.style.listStyle = 'none');

  // Inicializa el menú con el selector en la opción seleccionada
  function updateMenu() {
    items.forEach((li, idx) => {
      let selector = li.querySelector('.crt-selector');
      if (!selector) {
        selector = document.createElement('span');
        selector.className = 'crt-selector';
        selector.style.display = 'inline-block';
        selector.style.width = '3.5em';
        selector.style.fontWeight = 'bold';
        selector.style.marginRight = '8px';
        li.insertBefore(selector, li.firstChild);
      }
      selector.innerHTML = idx === selected ? '<strong>C:\\></strong>' : '';
      selector.style.color = idx === selected ? '#00ff00' : 'transparent';
      li.classList.toggle('selected', idx === selected);
    });
  }

  function moveSelector(dir) {
    selected = (selected + dir + items.length) % items.length;
    updateMenu();
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      moveSelector(1);
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      moveSelector(-1);
      e.preventDefault();
    } else if (e.key === 'Enter') {
      const link = items[selected].querySelector('a');
      if (link) link.click();
    }
  });

  updateMenu();
});
