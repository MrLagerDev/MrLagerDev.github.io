document.addEventListener('DOMContentLoaded', function() {
  const firstLine = " C:\\>";
  const firstLineEnd = "    cd Proyectos";
  const secondLineStart = "    Proyectos\\:";
  const secondLineEnd = " tree";
  const typewriter = document.getElementById('typewriter');
  if (!typewriter) return;

  let step = 0;
  let char = 0;

  function type() {
    if (step === 0) {
      // Animar la primera línea después del prompt fijo
      if (char <= firstLineEnd.length) {
        typewriter.innerHTML =
          firstLine + firstLineEnd.slice(0, char) + '<span class="cursor">█</span>';
        char++;
        setTimeout(type, 100);
      } else {
        step = 1;
        char = 0;
        setTimeout(type, 350);
      }
    } else if (step === 1) {
      // Mostrar la segunda línea (sin "tree") de golpe
      typewriter.innerHTML = firstLine + firstLineEnd + '<br>' + secondLineStart + '<span class="cursor">█</span>';
      step = 2;
      char = 0;
      setTimeout(type, 350);
    } else if (step === 2) {
      // Animar " tree"
      if (char <= secondLineEnd.length) {
        typewriter.innerHTML =
          firstLine + firstLineEnd + '<br>' +
          secondLineStart + secondLineEnd.slice(0, char) +
          '<span class="cursor">█</span>';
        char++;
        setTimeout(type, 80);
      } else {
        // Al terminar, deja el texto sin cursor
        typewriter.innerHTML = firstLine + firstLineEnd + '<br>' + secondLineStart + secondLineEnd;
        // Mostrar el menú línea por línea
        const menu = document.getElementById('crt-menu');
        if (menu) {
          menu.style.display = 'block';
          const lines = Array.from(menu.querySelectorAll('.menu-item, .menu-item.menu-selectable'));
          lines.forEach(line => line.style.visibility = 'hidden');
          let i = 0;
          function showLine() {
            if (i < lines.length) {
              lines[i].style.visibility = 'visible';
              i++;
              setTimeout(showLine, 80);
            }
          }
          showLine();
        }
      }
    }
  }
  type();
});