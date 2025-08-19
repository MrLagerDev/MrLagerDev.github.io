// Menú CRT navegable con teclado y selector visual tipo terminal
window.addEventListener('DOMContentLoaded', () => {
  // ----- MENÚ CRT -----
  const menu = document.querySelector('#crt-menu ul');
  if (menu) {
    let items = Array.from(menu.querySelectorAll('li, .menu-selectable'));
    let selectedMenu = 0;

    // Elimina los estilos de lista para quitar el punto
    menu.style.listStyle = 'none';
    items.forEach(li => li.style.listStyle = 'none');

    function updateMenu() {
      const isTree = menu.classList.contains('tree-menu');
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
        // Solo muestra el cursor si NO es un menú tipo árbol
        selector.innerHTML = (!isTree && idx === selectedMenu) ? '<strong>C:\\></strong>' : '';
        selector.style.color = (!isTree && idx === selectedMenu) ? '#00ff00' : 'transparent';
        li.classList.toggle('selected', idx === selectedMenu);
      });
    }

    function moveSelector(dir) {
      selectedMenu = (selectedMenu + dir + items.length) % items.length;
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
        const link = items[selectedMenu].querySelector('a');
        if (link) link.click();
      }
    });

    updateMenu();
  }

  // ----- SELECTOR DE BANDERAS -----
  const flags = [
    document.getElementById('ascii-es'),
    document.getElementById('ascii-en')
  ].filter(Boolean); // filtra nulos si no existen

  if (flags.length > 0) {
    let selectedFlag = 0;

    function updateSelection() {
      flags.forEach((flag, i) => {
        if (i === selectedFlag) {
          flag.classList.add('blink');
          flag.focus();
        } else {
          flag.classList.remove('blink');
        }
      });
    }
    updateSelection();

    document.addEventListener('keydown', (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'd') {
        selectedFlag = (selectedFlag + 1) % flags.length;
        updateSelection();
      } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        selectedFlag = (selectedFlag - 1 + flags.length) % flags.length;
        updateSelection();
      } else if (e.key === 'Enter' || e.key === ' ') {
        if (selectedFlag === 0) {
          window.location.href = 'Vista%20principal.html';
        } else {
          window.location.href = 'en-construccion.html';
        }
      }
    });
  }
});

