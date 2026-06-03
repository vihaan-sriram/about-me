(function () {
  const logs = [];
  window.addLog = function (message) {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    logs.push(`[${timestamp}] ${message}`);
    const logsContent = document.getElementById('logs-content');
    if (logsContent) {
      logsContent.innerText = logs.join('\n');
      logsContent.scrollTop = logsContent.scrollHeight;
    }
  };

  // Check if Beta is active
  const isBeta = localStorage.getItem('vihaanos-beta') === 'true';

  // Apply Beta Theme on Load
  if (isBeta) {
    document.body.classList.add('vihaanos-beta');
  }

  // Boot Sequence
  const bootCanvas = document.getElementById('boot-canvas');
  const bootCtx = bootCanvas.getContext('2d');
  bootCanvas.width = window.innerWidth;
  bootCanvas.height = window.innerHeight;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
  const fontSize = 14;
  const columns = Math.floor(bootCanvas.width / fontSize);
  const drops = Array(columns).fill(0);

  function drawMatrix() {
    bootCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    bootCtx.fillRect(0, 0, bootCanvas.width, bootCanvas.height);
    bootCtx.fillStyle = isBeta ? '#f00' : '#00ff00';
    bootCtx.font = `${fontSize}px Courier New`;
    drops.forEach((y, i) => {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      bootCtx.fillText(text, i * fontSize, y * fontSize);
      if (y * fontSize > bootCanvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  const bootMessages = isBeta ? [
    '[INIT] VihaanOS v2.0.0 (Beta) Booting...',
    '[OK] Loading Neural Core v2.0...',
    '[OK] Mounting Quantum Chaos Engine...',
    '[OK] Initializing Red Matrix Interface...',
    '[OK] Syncing Mind v2.0...',
    '[INFO] VihaanOS 2.0 (Beta) Activated — Welcome to the Core. — Calvin (*Calvin and Hobbes*)'
  ] : [
    '[INIT] VihaanOS v1.0.0 Booting...',
    '[OK] Loading Neural Core...',
    '[OK] Mounting Memory Filesystem...',
    '[OK] Initializing Hacker GUI...',
    '[OK] Connecting to Vihaan’s Mind...',
    '[INFO] Noice! System Ready. — Jake Peralta (*Brooklyn Nine-Nine*)'
  ];

  let currentMessage = 0;
  let currentChar = 0;
  const bootText = document.getElementById('boot-text');

  function typeBootMessage() {
    if (currentMessage < bootMessages.length) {
      const message = bootMessages[currentMessage];
      if (currentChar <= message.length) {
        bootText.innerText = bootMessages.slice(0, currentMessage).join('\n') + '\n' + message.slice(0, currentChar);
        currentChar++;
      } else {
        currentMessage++;
        currentChar = 0;
      }
    }
  }

  let bootInterval = setInterval(() => {
    drawMatrix();
    typeBootMessage();
  }, 50);

  setTimeout(() => {
    clearInterval(bootInterval);
    document.getElementById('boot-screen').style.display = 'none';
    document.getElementById('root').style.display = 'block';
    addLog('System booted');
  }, 6000);

  // Neural Net Background
  const canvas = document.getElementById('neural-net');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particles = [];
  let particleCount = parseInt(localStorage.getItem('particle-density')) || 50;

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3 + 1
      });
    }
  }
  initParticles();

  let cursor = { x: -100, y: -100 };

  function drawNeuralNet() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = isBeta ? '#f00' : 'rgba(0, 255, 0, 0.5)';
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      const distToCursor = Math.hypot(p.x - cursor.x, p.y - cursor.y);
      if (distToCursor < 100) {
        ctx.strokeStyle = `rgba(255, 0, 0, ${1 - distToCursor / 100})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(cursor.x, cursor.y);
        ctx.stroke();
      }
    });
    particles.forEach((p, i) => {
      particles.forEach((p2, j) => {
        if (i < j) {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.strokeStyle = `rgba(255, 0, 0, ${1 - dist / 100})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
    });
    requestAnimationFrame(drawNeuralNet);
  }
  drawNeuralNet();

  // Custom Cursor
  const cursorBar = document.createElement('div');
  cursorBar.className = 'cursor-bar';
  document.body.appendChild(cursorBar);
  const trails = [];

  function handlePointerMove(x, y) {
    cursor.x = x;
    cursor.y = y;
    cursorBar.style.left = `${x}px`;
    cursorBar.style.top = `${y - 8}px`;
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = `${x - 10}px`;
    trail.style.top = `${y}px`;
    document.body.appendChild(trail);
    trails.push(trail);
    if (trails.length > 5) {
      const oldTrail = trails.shift();
      oldTrail.remove();
    }
  }

  document.addEventListener('mousemove', e => handlePointerMove(e.clientX, e.clientY));
  document.addEventListener('touchmove', e => {
    e.preventDefault();
    const touch = e.touches[0];
    handlePointerMove(touch.clientX, touch.clientY);
  }, { passive: false });
  document.addEventListener('touchstart', e => {
    const touch = e.touches[0];
    handlePointerMove(touch.clientX, touch.clientY);
  });

  // Double-click desktop → Hobbes easter egg
  document.querySelector('.desktop').addEventListener('dblclick', () => {
    alert("Hobbes: BANZAI!!! — Calvin and Hobbes");
    addLog('Easter egg triggered: Hobbes roars');
  });

  // Mind Map (unchanged)
  const mindMapCanvas = document.getElementById('mind-map-canvas');
  if (mindMapCanvas) {
    mindMapCanvas.width = 760;
    mindMapCanvas.height = 400;
    const mindMapCtx = mindMapCanvas.getContext('2d');
    const nodes = [
      { id: 'core', label: 'Vihaan', x: 380, y: 200, radius: 40 },
      { id: 'tech', label: 'Tech', x: 200, y: 100, radius: 30 },
      { id: 'law', label: 'Law', x: 200, y: 300, radius: 30 },
      { id: 'env', label: 'Environment', x: 560, y: 100, radius: 30 },
      { id: 'code', label: 'Coding', x: 100, y: 50, radius: 20, parent: 'tech' },
      { id: 'ai', label: 'AI', x: 100, y: 150, radius: 20, parent: 'tech' },
      { id: 'av', label: 'AVs', x: 100, y: 250, radius: 20, parent: 'law' },
      { id: 'ethics', label: 'Ethics', x: 100, y: 350, radius: 20, parent: 'law' },
      { id: 'sustain', label: 'Sustainability', x: 660, y: 50, radius: 20, parent: 'env' }
    ];

    function drawMindMap() {
      mindMapCtx.clearRect(0, 0, mindMapCanvas.width, mindMapCanvas.height);
      nodes.forEach(node => {
        if (node.parent) {
          const parent = nodes.find(n => n.id === node.parent);
          mindMapCtx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
          mindMapCtx.beginPath();
          mindMapCtx.moveTo(node.x, node.y);
          mindMapCtx.lineTo(parent.x, parent.y);
          mindMapCtx.stroke();
        }
      });
      nodes.forEach(node => {
        mindMapCtx.fillStyle = 'rgba(0, 255, 0, 0.2)';
        mindMapCtx.beginPath();
        mindMapCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        mindMapCtx.fill();
        mindMapCtx.fillStyle = '#00ff00';
        mindMapCtx.font = `${node.radius / 2}px Courier New`;
        mindMapCtx.textAlign = 'center';
        mindMapCtx.textBaseline = 'middle';
        mindMapCtx.fillText(node.label, node.x, node.y);
      });
      requestAnimationFrame(drawMindMap);
    }
    drawMindMap();
  }

  // Settings
  const soundVolume = document.getElementById('sound-volume');
  const particleDensity = document.getElementById('particle-density');
  const terminalFontSize = document.getElementById('terminal-font-size');

  if (soundVolume) {
    soundVolume.value = localStorage.getItem('sound-volume') || 0.2;
    soundVolume.addEventListener('input', () => {
      localStorage.setItem('sound-volume', soundVolume.value);
      addLog(`Set sound volume to ${soundVolume.value}`);
    });
  }

  if (particleDensity) {
    particleDensity.value = localStorage.getItem('particle-density') || 50;
    particleDensity.addEventListener('input', () => {
      particleCount = parseInt(particleDensity.value);
      localStorage.setItem('particle-density', particleDensity.value);
      initParticles();
      addLog(`Set particle density to ${particleCount}`);
    });
  }

  if (terminalFontSize) {
    terminalFontSize.value = localStorage.getItem('terminal-font-size') || 14;
    terminalFontSize.addEventListener('input', () => {
      document.querySelector('.terminal-panel').style.fontSize = `${terminalFontSize.value}px`;
      localStorage.setItem('terminal-font-size', terminalFontSize.value);
      addLog(`Set terminal font size to ${terminalFontSize.value}`);
    });
    document.querySelector('.terminal-panel').style.fontSize = `${terminalFontSize.value}px`;
  }

  // Projects Filter
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.project').forEach(project => {
        const categories = project.getAttribute('data-category').split(' ');
        project.style.display = filter === 'all' || categories.includes(filter) ? 'block' : 'none';
      });
      addLog(`Filtered projects: ${filter}`);
    });
  });

  // Taskbar Clock
  function updateClock() {
    const now = new Date();
    document.getElementById('taskbar-clock').innerText = now.toLocaleTimeString('en-US', { hour12: false });
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Start Menu
  const startMenuBtn = document.getElementById('start-menu-btn');
  const startMenu = document.getElementById('start-menu');
  const startSearch = document.getElementById('start-search');

  if (startMenuBtn) {
    startMenuBtn.addEventListener('click', () => {
      startMenu.classList.toggle('active');
      addLog('Toggled Start Menu');
    });
  }

  if (startSearch) {
    startSearch.addEventListener('input', () => {
      const query = startSearch.value.toLowerCase();
      document.querySelectorAll('.start-menu-item').forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(query) ? 'block' : 'none';
      });
    });
  }

  // Window Management
  window.viewWindow = function(id) {
    const windowEl = document.getElementById(id);
    if (windowEl) {
      windowEl.classList.add('active');
      windowEl.style.zIndex = Math.max(...Array.from(document.querySelectorAll('.window')).map(w => parseInt(w.style.zIndex || 10))) + 1;
      addLog(`Opened window: ${id}`);
    }
  }

  window.closeWindow = function(id) {
    document.getElementById(id).classList.remove('active');
    addLog(`Closed window: ${id}`);
  }

  // Drag Windows
  document.querySelectorAll('.window-header').forEach(header => {
    let isDragging = false;
    let currentX, currentY, initialX, initialY;

    function dragStart(e) {
      const windowEl = header.parentElement;
      initialX = e.clientX || e.touches[0].clientX;
      initialY = e.clientY || e.touches[0].clientY;
      currentX = windowEl.offsetLeft;
      currentY = windowEl.offsetTop;
      isDragging = true;
      windowEl.style.zIndex = Math.max(...Array.from(document.querySelectorAll('.window')).map(w => parseInt(w.style.zIndex || 10))) + 1;
    }

    function drag(e) {
      if (isDragging) {
        e.preventDefault();
        const newX = e.clientX || e.touches[0].clientX;
        const newY = e.clientY || e.touches[0].clientY;
        header.parentElement.style.left = `${currentX + newX - initialX}px`;
        header.parentElement.style.top = `${currentY + newY - initialY}px`;
      }
    }

    function dragEnd() {
      isDragging = false;
    }

    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    header.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', dragEnd);
  });

  // Desktop Icon Click
  document.querySelectorAll('.desktop-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const app = icon.id.split('-')[0];
      viewWindow(`${app}-window`);
    });
  });

  // Terminal
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');

  if (terminalInput) {
    terminalInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        const historyItem = document.createElement('div');
        historyItem.textContent = `> ${cmd}`;
        terminalHistory.appendChild(historyItem);

        let response = '';

        // Upgrade to 2.0
        if (cmd === 'upgrade os' || cmd === 'upgrade os --force') {
          document.body.classList.add('vihaanos-beta');
          localStorage.setItem('vihaanos-beta', 'true');
          response = '[UPGRADE] Initializing VihaanOS 2.0 (Beta)...\n[OK] Red Matrix Interface Activated.\n[INFO] Welcome to the Core. — Calvin (*Calvin and Hobbes*)';
          setTimeout(() => location.reload(), 2000);
        }
        else if (cmd === 'theme red') {
          document.body.classList.add('vihaanos-beta');
          localStorage.setItem('vihaanos-beta', 'true');
          response = 'Theme set to Red Matrix. — VihaanOS';
          setTimeout(() => location.reload(), 1000);
        }
        else if (cmd === 'open satire') {
          window.open('https://vihaantotherescue.github.io/The-Lawkward-Files/', '_blank');
          response = 'Opening The Lawkward Files... — Vihaan Sriram';
        }
        else if (cmd === '--help') {
          response = `
            VihaanOS 2.0 (Beta) CLI Help:
            - upgrade os               : Upgrade to VihaanOS 2.0 (Beta)
            - theme red                : Set red matrix theme
            - open satire              : Read The Lawkward Files
            - open <app>               : Open any app
            - help / --help            : Show help
            — Calvin (*Calvin and Hobbes*)
          `;
        }
        else {
          response = `Command not found: ${cmd}. Try 'help'. — Patrick Jane (*The Mentalist*)`;
        }

        const responseItem = document.createElement('div');
        responseItem.textContent = response;
        terminalHistory.appendChild(responseItem);
        terminalHistory.scrollTop = terminalHistory.scrollHeight;
        terminalInput.value = '';
        addLog(`Ran command: ${cmd}`);
      }
    });
  }

  // === FAVOURITE QUOTES SYSTEM ===
  const vihaanQuotes = [
    "Happiness isn't good enough for me! I demand Euphoria!",
    "I'm learning real skills that I can apply throughout the rest of my life ... procrastinating and rationalizing.",
    "It's hard to be religious when certain people are never incinerated by bolts of lightning.",
    "Yakka foob mog. Zink wattoom gazort. Chumble spuzz.",
    "I think grown ups just act like they know what they’re doing..."
  ];

  let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  let userName = localStorage.getItem('userName') || '';

  // Greeting
  const greeting = document.getElementById('greeting');
  const nameInput = document.getElementById('name-input');
  if (nameInput) {
    nameInput.value = userName;
    nameInput.addEventListener('change', (e) => {
      userName = e.target.value.trim();
      localStorage.setItem('userName', userName);
      updateGreeting();
    });
  }

  function updateGreeting() {
    greeting.textContent = userName ? `Hi ${userName}!` : 'Hi there!';
  }
  updateGreeting();

  // Mood Button
  document.getElementById('mood-btn').addEventListener('click', () => {
    const random = vihaanQuotes[Math.floor(Math.random() * vihaanQuotes.length)];
    alert(`Vihaan says: "${random}"`);
  });

  // Render Quotes
  function renderQuotes(filter = '') {
    const list = document.getElementById('quotes-list');
    if (!list) return;
    list.innerHTML = '<h3>Your Quotes</h3>';

    vihaanQuotes.forEach((quote, i) => {
      const div = document.createElement('div');
      div.className = 'project';
      div.innerHTML = `
        <p>"${quote}"</p>
        <button class="filter-btn" onclick="addToFavourites(\`${quote}\`)">❤️ Save</button>
      `;
      list.appendChild(div);
    });

    const soon = document.createElement('p');
    soon.innerHTML = '<em>More quotes coming soon... — Calvin (*Calvin and Hobbes*)</em>';
    list.appendChild(soon);
  }

  window.addToFavourites = function(quote) {
    if (!favourites.includes(quote)) {
      favourites.push(quote);
      localStorage.setItem('favourites', JSON.stringify(favourites));
      renderFavourites();
      addLog(`Added quote to favourites: ${quote}`);
    }
  };

  function renderFavourites() {
    const list = document.getElementById('favourites-list');
    if (favourites.length === 0) {
      list.innerHTML = '<p><em>No favourites yet. Click ❤️ on a quote!</em></p>';
      return;
    }
    list.innerHTML = '<h3>Your Favourites</h3>';
    favourites.forEach((q, i) => {
      const p = document.createElement('p');
      p.innerHTML = `"${q}" <button class="filter-btn" style="padding:2px 6px;font-size:0.8rem;" onclick="removeFavourite(${i})">✕</button>`;
      list.appendChild(p);
    });
  }

  window.removeFavourite = function(index) {
    favourites.splice(index, 1);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    renderFavourites();
    addLog('Removed quote from favourites');
  };

  // Search Quotes
  const searchInput = document.getElementById('quote-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderQuotes(e.target.value);
    });
  }

  // Initial render
  renderQuotes();
  renderFavourites();

  // Add The Lawkward Files to Projects
  const projectsList = document.getElementById('projects-list');
  if (projectsList) {
    const lawkwardProject = document.createElement('div');
    lawkwardProject.className = 'project';
    lawkwardProject.setAttribute('data-category', 'law');
    lawkwardProject.innerHTML = `
      <a href="https://vihaantotherescue.github.io/The-Lawkward-Files/" target="_blank">
        <h3>The Lawkward Files</h3>
        <p>15 short stories in legal satire. Winner of the India Book of Records Achievers Award.</p>
      </a>
    `;
    projectsList.insertBefore(lawkwardProject, projectsList.firstChild);
  }

})();