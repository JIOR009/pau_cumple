const letterText = `Feliz cumpleaños. Hoy es un día especial para ti y, por supuesto, que no me olvidaría de ello… (me olvidé hace 2 días, pero me acordé).

Así que hoy te hago esta página web con mucho amor. Gracias por ser mi mejor amiga y estar aquí.`;

const audio = document.getElementById('birthdayAudio');
const musicBtn = document.getElementById('musicBtn');

musicBtn.addEventListener('click', async () => {
  try {
    if (audio.paused) {
      await audio.play();
      musicBtn.textContent = '⏸ Pausar canción';
    } else {
      audio.pause();
      musicBtn.textContent = '🎵 Reproducir canción';
    }
  } catch (err) {
    alert('Falta el archivo de música. Coloca tu canción como "assets/cumple.mp3" y vuelve a abrir la página.');
  }
});

audio.addEventListener('ended', () => {
  musicBtn.textContent = '🎵 Reproducir canción';
});

// Estrellas de fondo
const stars = document.getElementById('stars');
for (let i = 0; i < 110; i++) {
  const s = document.createElement('span');
  s.className = 'star-dot';
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 100 + '%';
  s.style.opacity = (0.2 + Math.random() * 0.75).toFixed(2);
  s.style.animationDelay = (Math.random() * 4).toFixed(2) + 's';
  s.style.width = s.style.height = (1 + Math.random() * 2.6).toFixed(1) + 'px';
  stars.appendChild(s);
}

// Galería
const modal = document.getElementById('photoModal');
const modalImage = document.getElementById('modalImage');
document.querySelectorAll('.photo-card').forEach(card => {
  card.addEventListener('click', () => {
    modalImage.src = card.dataset.src;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  });
});
const closeModal = () => {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
};
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

// 17 mensajes: son deseos/celebraciones, no datos inventados sobre ella.
const wishes = [
  'Que nunca te falten razones para sonreír.',
  'Que este nuevo año te traiga momentos que quieras recordar.',
  'Que tengas días tranquilos y noches bonitas.',
  'Que siempre encuentres algo que te emocione.',
  'Que tus metas se acerquen poquito a poquito.',
  'Que te rodee gente que te aprecie de verdad.',
  'Que tengas muchas aventuras nuevas.',
  'Que puedas guardar recuerdos que valgan oro.',
  'Que este año tenga más risas que estrés.',
  'Que cada pequeño logro te dé orgullo.',
  'Que tengas tiempo para hacer lo que te gusta.',
  'Que descubras lugares, canciones y momentos nuevos.',
  'Que nunca pierdas tu esencia.',
  'Que tus próximos capítulos estén llenos de sorpresas bonitas.',
  'Que te permitas celebrar cada paso.',
  'Que el 17 sea un año que recuerdes con cariño.',
  'Y que hoy la pases increíble. 🎂💙'
];

const grid = document.getElementById('messagesGrid');
wishes.forEach((wish, i) => {
  const b = document.createElement('button');
  b.className = 'message';
  b.innerHTML = `<span class="star">✦</span><span class="text">${wish}</span><span class="number">${String(i+1).padStart(2,'0')}</span>`;
  b.addEventListener('click', () => {
    b.classList.toggle('open');
  });
  grid.appendChild(b);
});

// Carta: se revela únicamente mientras se desplaza la página.
const letterSection = document.querySelector('.letter-section');
const envelope = document.getElementById('envelope');
const paper = document.getElementById('paper');
const typed = document.getElementById('typedLetter');
const letterButton = document.getElementById('letterBtn');

function updateLetterProgress() {
  if (!letterSection || !envelope || !paper) return;

  const scrollBox = letterSection.querySelector('.letter-scroll');
  const rect = scrollBox.getBoundingClientRect();
  const maxTravel = Math.max(1, rect.height - window.innerHeight * 0.78);

  // 0 = sobre cerrado, 1 = carta completamente revelada.
  const progress = Math.min(1, Math.max(0, -rect.top / maxTravel));

  envelope.style.setProperty('--letter-progress', progress.toFixed(3));

  // La hoja empieza detrás del frente y pasa delante cuando ya está saliendo.
  paper.style.zIndex = progress > 0.28 ? '6' : '2';

  // Texto progresivo: aparece exactamente al seguir bajando.
  const reveal = Math.min(1, progress * 1.22);
  typed.textContent = letterText.slice(0, Math.floor(letterText.length * reveal));
}

window.addEventListener('scroll', updateLetterProgress, {passive: true});
window.addEventListener('resize', updateLetterProgress);
window.addEventListener('load', updateLetterProgress);

// Este botón solo lleva a la sección de la carta.
letterButton.addEventListener('click', () => {
  letterSection.scrollIntoView({behavior: 'smooth', block: 'start'});
  setTimeout(updateLetterProgress, 120);
});

// Regalo
const giftOverlay = document.getElementById('giftOverlay');
document.getElementById('giftBtn').addEventListener('click', () => {
  giftOverlay.classList.add('show');
  giftOverlay.setAttribute('aria-hidden', 'false');
  launchConfetti(90);
});
document.getElementById('giftClose').addEventListener('click', () => {
  giftOverlay.classList.remove('show');
  giftOverlay.setAttribute('aria-hidden', 'true');
});

// Confeti
function launchConfetti(count = 55) {
  for (let i = 0; i < count; i++) {
    const c = document.createElement('span');
    c.className = 'confetti';
    const hue = Math.floor(195 + Math.random() * 45);
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = `hsl(${hue} 95% 72%)`;
    c.style.setProperty('--x', `${(Math.random() - .5) * 220}px`);
    c.style.animationDuration = (2.3 + Math.random() * 2.3) + 's';
    c.style.animationDelay = (Math.random() * .25) + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}
document.getElementById('confettiBtn').addEventListener('click', () => launchConfetti(75));

// Animaciones al entrar
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: .12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
