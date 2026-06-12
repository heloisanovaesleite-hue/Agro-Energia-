/* ============================================================
   AGRO ENERGIA — script.js
   Vanilla JS | Partículas · Música · Quiz · Animações
   ============================================================ */

'use strict';

// ============================================================
// 1. PARTÍCULAS (canvas — folhas + energia)
// ============================================================
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];

  // Configura dimensões
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Classe partícula
  class Particle {
    constructor() { this.reset(true); }

    reset(fresh) {
      this.x    = Math.random() * W;
      this.y    = fresh ? Math.random() * H : -20;
      this.size = Math.random() * 6 + 2;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.speedY = Math.random() * 0.6 + 0.3;
      this.opacity = Math.random() * 0.5 + 0.15;
      this.rot  = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.03;
      // tipo: 0 = folha, 1 = ponto luminoso (energia)
      this.type = Math.random() < 0.6 ? 0 : 1;
      this.hue  = this.type === 0
        ? (100 + Math.random() * 50)   // verde para folhas
        : (40 + Math.random() * 30);   // dourado/amarelo para energia
    }

    update() {
      this.x   += this.speedX + Math.sin(Date.now() * 0.001 + this.y * 0.01) * 0.3;
      this.y   += this.speedY;
      this.rot += this.rotSpeed;
      if (this.y > H + 30) this.reset(false);
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);

      if (this.type === 0) {
        // Folha simples
        ctx.fillStyle = `hsl(${this.hue}, 65%, 42%)`;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Ponto de energia com brilho
        const grad = ctx.createRadialGradient(0,0,0, 0,0, this.size);
        grad.addColorStop(0, `hsla(${this.hue}, 100%, 75%, 1)`);
        grad.addColorStop(1, `hsla(${this.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // Cria partículas iniciais
  for (let i = 0; i < 50; i++) particles.push(new Particle());

  // Loop de animação
  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();


// ============================================================
// 2. MÚSICA DE FUNDO
// ============================================================
(function initMusic() {
  const audio   = document.getElementById('bgMusic');
  const btn     = document.getElementById('musicToggle');
  const icon    = document.getElementById('musicIcon');
  const slider  = document.getElementById('volumeSlider');
  let playing   = false;

  audio.volume = parseFloat(slider.value);

  btn.addEventListener('click', () => {
    if (!playing) {
      audio.play().catch(() => {
        // Alguns navegadores bloqueiam autoplay: usuário deve clicar
        console.info('Aguardando interação para reproduzir áudio.');
      });
      icon.textContent = '⏸';
      playing = true;
    } else {
      audio.pause();
      icon.textContent = '▶';
      playing = false;
    }
  });

  slider.addEventListener('input', () => {
    audio.volume = parseFloat(slider.value);
  });
})();


// ============================================================
// 3. SCROLL REVEAL
// ============================================================
(function initScrollReveal() {
  const els = document.querySelectorAll('.scroll-reveal');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.style.getPropertyValue('--delay') || '0');
        setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => obs.observe(el));
})();


// ============================================================
// 4. CONTADORES ANIMADOS (estatísticas hero)
// ============================================================
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const dur    = 2000; // ms
      const start  = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / dur, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
})();


// ============================================================
// 5. PARALLAX LEVE (hero background)
// ============================================================
(function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const sky  = hero.querySelector('.sky');
    const land = hero.querySelector('.landscape');
    const g1   = hero.querySelector('.g1');
    const g2   = hero.querySelector('.g2');

    if (sky)  sky.style.transform  = `translateY(${scrolled * 0.25}px)`;
    if (land) land.style.transform = `translateY(${scrolled * 0.1}px)`;
    if (g1)   g1.style.transform   = `translateY(${scrolled * 0.05}px)`;
    if (g2)   g2.style.transform   = `translateY(${scrolled * 0.08}px)`;
  }, { passive: true });
})();


// ============================================================
// 6. SCROLL SUAVE PARA CARDS
// ============================================================
function scrollToCards() {
  document.getElementById('cardsSection').scrollIntoView({ behavior: 'smooth' });
}


// ============================================================
// 7. QUIZ
// ============================================================

// --- Banco de perguntas ---
const QUESTIONS = [
  {
    question: 'Qual tecnologia transforma resíduos orgânicos de granjas e lavouras em energia para propriedades rurais?',
    options: [
      'Painéis fotovoltaicos',
      'Biodigestor de biogás',
      'Turbina a gás natural',
      'Microturbina hidráulica'
    ],
    correct: 1,
    explanation: '✅ Correto! O biodigestor converte biomassa e resíduos orgânicos em biogás (metano), usado para geração de energia elétrica e calor.'
  },
  {
    question: 'O Brasil é líder mundial em qual fonte de energia renovável aplicada ao agronegócio?',
    options: [
      'Energia nuclear',
      'Energia geotérmica',
      'Energia solar fotovoltaica rural',
      'Geração de energia a partir de cana-de-açúcar (bioeletricidade)'
    ],
    correct: 3,
    explanation: '✅ Correto! O Brasil é líder global em bioeletricidade a partir de cana-de-açúcar, sendo o setor sucroalcooleiro responsável por enorme parcela da geração renovável.'
  },
  {
    question: 'Qual é a principal vantagem do sistema fotovoltaico instalado diretamente nas propriedades rurais?',
    options: [
      'Funciona melhor durante a noite',
      'Elimina completamente o uso de agua na propriedade',
      'Reduz a conta de energia elétrica em até 95%',
      'Depende exclusivamente de ventos constantes'
    ],
    correct: 2,
    explanation: '✅ Correto! Sistemas fotovoltaicos bem dimensionados podem reduzir a conta de energia elétrica em até 95%, com retorno do investimento em 4 a 7 anos.'
  },
  {
    question: 'O que são "créditos de carbono" no contexto da agroenergia sustentável?',
    options: [
      'Desconto concedido pelo governo para compra de combustível fóssil',
      'Certificados que comprovam a redução ou remoção de emissões de CO₂',
      'Financiamentos especiais para aquisição de tratores',
      'Multas aplicadas por desmatamento ilegal'
    ],
    correct: 1,
    explanation: '✅ Correto! Créditos de carbono são certificados que representam a redução ou remoção de 1 tonelada de CO₂ equivalente, podendo ser negociados no mercado global.'
  },
  {
    question: 'Qual região do Brasil possui maior potencial para geração de energia eólica no agronegócio?',
    options: [
      'Floresta Amazônica (Norte)',
      'Pantanal (Centro-Oeste)',
      'Nordeste (Sertão e litoral)',
      'Vale do Ribeira (Sudeste)'
    ],
    correct: 2,
    explanation: '✅ Correto! O Nordeste brasileiro, especialmente o Sertão e o litoral, concentra os maiores parques eólicos do país, com ventos constantes e de alta intensidade ao longo do ano.'
  }
];

let currentQ  = 0;
let score     = 0;
let answered  = false;

// Inicia o quiz (mostra tela de questões)
function launchQuiz() {
  currentQ = 0;
  score    = 0;
  answered = false;
  document.getElementById('quizStart').style.display  = 'none';
  document.getElementById('quizResult').style.display = 'none';
  document.getElementById('quizPlay').style.display   = 'block';
  document.getElementById('scoreCounter').textContent = '0';
  renderQuestion();
}

// Navegar para seção do quiz e iniciar
function startQuiz() {
  document.getElementById('quizSection').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    const quizStart = document.getElementById('quizStart');
    if (quizStart.style.display !== 'none') launchQuiz();
  }, 700);
}

// Renderiza a pergunta atual
function renderQuestion() {
  answered = false;
  const q   = QUESTIONS[currentQ];
  const pct = ((currentQ) / QUESTIONS.length) * 100;

  // Progresso
  document.getElementById('progressFill').style.width  = `${pct}%`;
  document.getElementById('progressLabel').textContent = `${currentQ + 1} / ${QUESTIONS.length}`;
  document.getElementById('questionNum').textContent   = `Pergunta ${currentQ + 1}`;
  document.getElementById('questionText').textContent  = q.question;
  document.getElementById('feedbackMsg').textContent   = '';
  document.getElementById('feedbackMsg').className     = 'feedback-msg';
  document.getElementById('nextBtn').style.display     = 'none';

  // Opções
  const grid = document.getElementById('optionsGrid');
  grid.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className   = 'option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleAnswer(i, btn));
    grid.appendChild(btn);
  });

  // Animação de entrada
  const card = document.getElementById('questionCard');
  card.style.animation = 'none';
  void card.offsetWidth; // reflow
  card.style.animation = '';
}

// Processa resposta
function handleAnswer(idx, btn) {
  if (answered) return;
  answered = true;

  const q    = QUESTIONS[currentQ];
  const btns = document.querySelectorAll('.option-btn');
  btns.forEach(b => b.disabled = true);

  const feedback = document.getElementById('feedbackMsg');

  if (idx === q.correct) {
    btn.classList.add('correct');
    score++;
    updateScore();
    feedback.textContent = q.explanation;
    feedback.classList.add('correct');
    playSoundCorrect();
  } else {
    btn.classList.add('wrong');
    btns[q.correct].classList.add('correct');
    feedback.textContent = `❌ Resposta errada. ${q.explanation}`;
    feedback.classList.add('wrong');
    playSoundWrong();
  }

  document.getElementById('nextBtn').style.display = 'block';
}

// Avança para próxima pergunta ou resultado
function nextQuestion() {
  currentQ++;
  if (currentQ < QUESTIONS.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

// Atualiza contador de pontuação com animação
function updateScore() {
  const el = document.getElementById('scoreCounter');
  el.textContent = score;
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
}

// Exibe resultado final
function showResult() {
  document.getElementById('progressFill').style.width = '100%';
  document.getElementById('quizPlay').style.display   = 'none';
  document.getElementById('quizResult').style.display = 'block';

  const pct = score / QUESTIONS.length;
  let medal, title, msg;

  if (pct >= 0.8) {
    medal = '🏆';
    title = 'Excelente!';
    msg   = 'Você é um verdadeiro especialista em Agro Energia! O campo sustentável agradece.';
  } else if (pct >= 0.5) {
    medal = '🌿';
    title = 'Bom trabalho!';
    msg   = 'Você tem bom conhecimento sobre agroenergia. Continue se aprofundando no tema!';
  } else {
    medal = '📚';
    title = 'Pode melhorar!';
    msg   = 'Você está no início da jornada verde. Explore os cards acima e tente novamente!';
  }

  document.getElementById('resultMedal').textContent = medal;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultMsg').textContent   = msg;
  document.getElementById('resultScore').textContent = score;

  // Estrelas
  const starsEl = document.getElementById('resultStars');
  const starCount = Math.round(pct * 5);
  starsEl.textContent = '⭐'.repeat(starCount) + '☆'.repeat(5 - starCount);

  // Animação de contador de pontuação
  const scoreEl = document.getElementById('resultScore');
  let current = 0;
  const final = score;
  const interval = setInterval(() => {
    current = Math.min(current + 1, final);
    scoreEl.textContent = current;
    if (current >= final) clearInterval(interval);
  }, 200);
}

// Reinicia o quiz
function resetQuiz() {
  document.getElementById('quizResult').style.display = 'none';
  document.getElementById('quizStart').style.display  = 'block';
  launchQuiz();
}


// ============================================================
// 8. SONS DO QUIZ (gerados via Web Audio API — sem arquivos externos)
// ============================================================
function createAudioContext() {
  return window.AudioContext
    ? new AudioContext()
    : window.webkitAudioContext
      ? new webkitAudioContext()
      : null;
}

function playSoundCorrect() {
  const ctx = createAudioContext();
  if (!ctx) return;
  // Dois tons alegres
  [[660, 0], [880, 0.12]].forEach(([freq, delay]) => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type        = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.18, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.35);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + 0.36);
  });
}

function playSoundWrong() {
  const ctx = createAudioContext();
  if (!ctx) return;
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type            = 'sawtooth';
  osc.frequency.value = 220;
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.41);
}


// ============================================================
// 9. ROTAÇÃO DIFERENCIADA DAS PALHETAS (velocidade aleatória suave)
// ============================================================
(function randomizeBladeSpeed() {
  const blades = document.querySelectorAll('.t-blades');
  blades.forEach(b => {
    const speed = (Math.random() * 3 + 1.5).toFixed(2);
    b.style.animationDuration = `${speed}s`;
  });
})();


// ============================================================
// 10. EASTER EGG: Konami Code → chuva de emojis 🌿
// ============================================================
(function konamiCode() {
  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;
  document.addEventListener('keydown', e => {
    if (e.key === code[pos]) {
      pos++;
      if (pos === code.length) {
        pos = 0;
        emojiRain();
      }
    } else { pos = 0; }
  });

  function emojiRain() {
    const emojis = ['🌿','☀️','💨','🌱','⚡','🌾','🐄','🔋'];
    for (let i = 0; i < 30; i++) {
      const el = document.createElement('div');
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.cssText = `
        position:fixed; top:-40px;
        left:${Math.random()*100}vw;
        font-size:${24+Math.random()*24}px;
        z-index:9999; pointer-events:none;
        animation: konamiFall ${1.5+Math.random()*2}s ease-in forwards;
        animation-delay: ${Math.random()*0.8}s;
      `;
      document.body.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }
    // Injeta animação se ainda não existe
    if (!document.getElementById('konamiStyle')) {
      const style = document.createElement('style');
      style.id = 'konamiStyle';
      style.textContent = `
        @keyframes konamiFall {
          from { transform: translateY(0) rotate(0deg); opacity:1; }
          to   { transform: translateY(110vh) rotate(360deg); opacity:0; }
        }`;
      document.head.appendChild(style);
    }
  }
})();


// ============================================================
// 11. INDICADOR DE CARREGAMENTO DA PÁGINA
// ============================================================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  // Inicia scroll reveal manual para elements já visíveis
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('visible');
  });
});
