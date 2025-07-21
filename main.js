// Animación avanzada para la secuencia de arranque y el ASCII art
window.addEventListener('DOMContentLoaded', () => {
  // Pantalla de inicio (ACTIVADA)
  const startScreen = document.getElementById('start-screen');
  const mainContent = document.body.querySelectorAll('body > section:not(#start-screen), header, audio');
  let started = false;
  function startApp() {
    if (started) return;
    started = true;
    if (startScreen) startScreen.style.display = 'none';
    mainContent.forEach(el => el.style.display = '');
    prepareAnimation(); // Oculta y prepara animación
    // Reproduce el audio al iniciar
    const audio = document.getElementById('boot-audio');
    if (audio) {
      audio.play().catch(() => {
        document.body.addEventListener('click', () => {
          audio.play();
        }, { once: true });
      });
    }
    // Inicia animación
    showNextBootLine();
    document.removeEventListener('keydown', startApp);
    document.removeEventListener('click', startApp);
  }
  if (startScreen) {
    mainContent.forEach(el => el.style.display = 'none');
    document.addEventListener('keydown', startApp);
    document.addEventListener('click', startApp);
    return;
  }
  // Si no hay pantalla de inicio, ejecuta animación y audio directamente
  prepareAnimation();
  const audio = document.getElementById('boot-audio');
  if (audio) {
    audio.play().catch(() => {
      document.body.addEventListener('click', () => {
        audio.play();
      }, { once: true });
    });
  }
  showNextBootLine();
  // El audio y la animación solo se ejecutan tras startApp
  // Boot sequence
  let bootSection, bootLines, bootEndLine, bootAnimLines, bootFinalLine;
  let asciiSection, asciiLines, mainSections, infoSection;
  function prepareAnimation() {
    bootSection = document.querySelector('.boot-sequence');
    bootLines = Array.from(bootSection.querySelectorAll('p'));
    bootEndLine = bootLines[bootLines.length - 1];
    bootAnimLines = bootLines.slice(1, -2); // Excluye la primera y la última línea
    bootFinalLine = bootLines[bootLines.length - 2];
    bootEndLine.style.display = 'none';
    bootAnimLines.forEach(line => line.style.display = 'none');
    bootFinalLine.style.display = 'none';
    asciiSection = document.querySelector('.ascii-art');
    asciiLines = Array.from(asciiSection.querySelectorAll('p'));
    asciiLines.forEach(line => line.style.display = 'none');
    mainSections = document.querySelectorAll('body > section');
    infoSection = mainSections[2];
    infoSection.style.display = 'none';
  }
  // No ejecutar nada hasta que el usuario inicie

  // Spinner
  const spinnerFrames = ['-', '\\', '|', '/'];
  const spinnerDelay = 50;
  const charDelay = 8;

  function animateBootLine(line, callback) {
    const text = line.childNodes[0].textContent;
    const okNode = line.querySelector('strong');
    let i = 0;
    let spinnerIdx = 0;
    let interval;
    line.style.display = '';
    line.childNodes[0].textContent = '';
    if (okNode) okNode.style.visibility = 'hidden';

    function typeChar() {
      if (i < text.length) {
        line.childNodes[0].textContent += text[i];
        i++;
        setTimeout(typeChar, charDelay);
      } else {
        // Spinner animation before [OK]
        let spinnerSpan = document.createElement('span');
        spinnerSpan.style.color = '#00ff00';
        spinnerSpan.style.fontWeight = 'bold';
        spinnerSpan.textContent = ' [-]';
        line.appendChild(spinnerSpan);
        interval = setInterval(() => {
          spinnerSpan.textContent = ' [' + spinnerFrames[spinnerIdx] + ']';
          spinnerIdx = (spinnerIdx + 1) % spinnerFrames.length;
        }, spinnerDelay);
        setTimeout(() => {
          clearInterval(interval);
          line.removeChild(spinnerSpan);
          if (okNode) okNode.style.visibility = 'visible';
          if (callback) callback();
        }, 800);
      }
    }
    typeChar();
  }

  function animateAsciiLine(line, callback) {
    line.style.display = '';
    if (callback) setTimeout(callback, 180);
  }

  // Animación secuencial
  let bootIdx = 0;
  function showNextBootLine() {
    if (bootIdx < bootAnimLines.length) {
      animateBootLine(bootAnimLines[bootIdx], () => {
        bootIdx++;
        showNextBootLine();
      });
    } else {
      bootFinalLine.style.display = '';
      setTimeout(() => {
        bootEndLine.style.display = '';
        // Cuando termina el boot, inicia el ASCII art línea por línea
        showAsciiArt();
      }, 600);
    }
  }

  let asciiIdx = 0;
  function showAsciiArt() {
    if (asciiIdx < asciiLines.length) {
      animateAsciiLine(asciiLines[asciiIdx], () => {
        asciiIdx++;
        showAsciiArt();
      });
    } else {
      // Cuando termina el ASCII art, muestra el resto del texto
      infoSection.style.display = '';
    }
  }

  // No ejecutar animación ni audio hasta que el usuario inicie
});
