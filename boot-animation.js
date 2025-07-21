// Animación letra por letra y spinner en la secuencia de arranque + animación ASCII art + mostrar contenido
window.addEventListener('DOMContentLoaded', () => {
  // Oculta todo el contenido principal hasta terminar animación
  const mainContent = document.getElementById('main-content') || document.body;
  const bootSection = mainContent.querySelector('.boot-sequence');
  const asciiSection = mainContent.querySelector('.ascii-art');
  const infoSection = mainContent.querySelector('section:not(.boot-sequence):not(.ascii-art)');
  if (!bootSection || !asciiSection || !infoSection) return;

  // Oculta todas las líneas de boot y ascii
  const bootLines = Array.from(bootSection.querySelectorAll('p'));
  const asciiLines = Array.from(asciiSection.querySelectorAll('p'));
  bootLines.forEach(line => line.style.display = 'none');
  asciiLines.forEach(line => line.style.display = 'none');
  infoSection.style.display = 'none';

  // Animación boot sequence
  const spinnerFrames = ['-', '\\', '|', '/'];
  const spinnerDelay = 35; // antes 80
  const charDelay = 6;    // antes 18

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
        if (okNode) {
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
            okNode.style.visibility = 'visible';
            if (callback) callback();
          }, 800);
        } else {
          if (callback) callback();
        }
      }
    }
    typeChar();
  }

  // Animación ASCII art línea por línea
  function animateAsciiLine(line, callback) {
    line.style.display = '';
    if (callback) setTimeout(callback, 90); // antes 180
  }

  // Secuencia animada boot + ascii + mostrar contenido
  let bootIdx = 0;
  function showNextBootLine() {
    if (bootIdx < bootLines.length) {
      const line = bootLines[bootIdx];
      // Si la línea contiene [OK], animar; si no, mostrar directamente
      if (line.innerHTML.includes('[OK]')) {
        animateBootLine(line, () => {
          bootIdx++;
          showNextBootLine();
        });
      } else {
        line.style.display = '';
        setTimeout(() => {
          bootIdx++;
          showNextBootLine();
        }, 120); // antes 250
      }
    } else {
      showNextAsciiLine();
    }
  }

  let asciiIdx = 0;
  // Mostrar el menú CRT solo tras el ASCII art
  const crtMenu = document.getElementById('crt-menu');
  function showNextAsciiLine() {
    if (asciiIdx < asciiLines.length) {
      animateAsciiLine(asciiLines[asciiIdx], () => {
        asciiIdx++;
        showNextAsciiLine();
      });
    } else {
      infoSection.style.display = '';
      if (crtMenu) crtMenu.style.display = '';
    }
  }

  // Reproduce el audio de arranque al iniciar la animación
  function playBootAudio() {
    const audio = document.getElementById('boot-audio');
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Fallback: reproduce al primer click o tecla si el navegador bloquea autoplay
      const resumeAudio = () => {
        audio.play();
        document.removeEventListener('keydown', resumeAudio);
        document.removeEventListener('click', resumeAudio);
      };
      document.addEventListener('keydown', resumeAudio);
      document.addEventListener('click', resumeAudio);
    });
  }
  playBootAudio();

  // Inicia animación al cargar
  showNextBootLine();
});
