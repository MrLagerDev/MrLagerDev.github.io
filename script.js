// Animación de la secuencia de arranque tipo terminal
window.addEventListener('DOMContentLoaded', () => {
  const bootSection = document.querySelector('.boot-sequence');
  if (!bootSection) return;

  // Obtén todos los párrafos excepto el primero y el último
  const lines = Array.from(bootSection.querySelectorAll('p'));
  if (lines.length === 0) return;

  // Oculta todas las líneas excepto la primera
  lines.forEach((line, i) => {
    if (i !== 0) line.style.display = 'none';
  });

  let idx = 1;
  function showNextLine() {
    if (idx < lines.length) {
      lines[idx].style.display = '';
      idx++;
      setTimeout(showNextLine, 200);
    }
  }
  setTimeout(showNextLine, 500);
});
