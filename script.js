(function() {
    // --- CRITICAL INITIAL SETUP ---
    document.querySelectorAll('.header, .section, .footer').forEach(el => {
        el.style.display = 'none';
        el.style.opacity = '0';
    });

    const passwordInput = document.getElementById("password-input");
    const passwordPrompt = document.getElementById("password-prompt");
    const passwordText = document.getElementById("password-text");
    const passwordStatus = document.getElementById("password-status");

    if (passwordInput) {
        passwordInput.style.color = 'transparent';
        passwordInput.style.backgroundColor = 'transparent';
        passwordInput.style.border = 'none';
        passwordInput.style.outline = 'none';
        passwordInput.style.caretColor = 'transparent';
        passwordInput.disabled = true; // Start disabled until explicitly enabled
    }
    if (passwordText && !passwordText.querySelector('.cursor')) {
        passwordText.textContent = "Enter Password: ";
        passwordText.innerHTML += '<span class="cursor">_</span>';
    }
    // --- END CRITICAL INITIAL SETUP ---

    const splashDuration = 5000;
    const correctPassword = "vihaan2025";
    const messages = [
        "Techie. Law Enthusiast. Environmentalist.",
        "CLAT Aspirant and Coding Geek",
        "Saving the planet one byte at a time.",
        "Matrix Mind In A Legal World",
        "Digital Defender of Nature"
    ];
    const nameText = "Vihaan Sriram";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()-=_+[]{}|;':,./<>?";

    let messageIndex = 0, messageCharIndex = 0, isTyping = true;
    let nameCharIndex = 0, isNameTyping = true;
    let nameAnimationCycleId = 0;
    let messageAnimationCycleId = 0;

    const typingElement = document.getElementById("typing");
    const headerName = document.getElementById("header-name");
    const hackingCode = document.getElementById("hacking-code");
    let isAuthenticated = false;
    const html = document.documentElement;

    const ipWarningPopup = document.createElement('div');
    ipWarningPopup.id = 'ip-warning-popup';
    ipWarningPopup.style.display = 'none';
    ipWarningPopup.innerHTML = `
        <div id="ip-warning-content">
            <h2>WARNING!</h2>
            <p>Unauthorized access attempt detected.</p>
            <p>Your activity is being monitored:</p>
            <p><strong>IP Address:</strong> <span id="user-ip">Acquiring...</span></p>
            <p><strong>Approx. Location:</strong> <span id="user-location">Tracking...</span></p>
            <p class="initiating-protocol">Initiating security protocol...</p>
            <button id="warning-ok-button">OK</button>
        </div>
    `;
    document.body.appendChild(ipWarningPopup);
    const userIpElement = document.getElementById("user-ip");
    const userLocationElement = document.getElementById("user-location");
    const warningOkButton = document.getElementById("warning-ok-button");

    const FORCED_INITIAL_THEME = "dark";
    try { localStorage.setItem("theme", FORCED_INITIAL_THEME); } catch (e) { console.warn("localStorage access error:", e); }
    const initialAppTheme = html.getAttribute("data-theme") || FORCED_INITIAL_THEME;

    function attemptFocusOnPasswordInput() {
        if (passwordInput && passwordPrompt && passwordPrompt.classList.contains('visible')) {
            if (!passwordInput.disabled) {
                passwordInput.focus();
            }
        }
    }

    if (passwordPrompt && passwordInput) {
        passwordPrompt.addEventListener('click', (event) => {
            if (event.target !== passwordInput && !passwordInput.disabled && passwordPrompt.classList.contains('visible')) {
                passwordInput.focus();
            }
        });
    }

    function getRandomChar() { return chars.charAt(Math.floor(Math.random() * chars.length)); }

    function typePasswordGuess(element, targetText, currentIndex, callback) {
        const maxAttempts = 8; let attempts = 0;
        const fixedText = targetText.substring(0, currentIndex - 1);
        const currentChar = targetText[currentIndex - 1];
        function updateChar() {
            let displayChar = getRandomChar();
            if (attempts >= maxAttempts) displayChar = currentChar;
            try { if (element) { element.innerHTML = fixedText + displayChar + `<span class="cursor">_</span>`; element.setAttribute("data-text", fixedText + displayChar); } }
            catch (e) { console.error("DOM update error in typePasswordGuess:", e); }
            if (attempts >= maxAttempts) { if (callback) callback(); } else { attempts++; setTimeout(updateChar, 50); }
        }
        updateChar();
    }

    function deleteText(element, targetText, currentIndex, callback) {
        try { if (element) { element.innerHTML = targetText.substring(0, currentIndex) + `<span class="cursor">_</span>`; element.setAttribute("data-text", targetText.substring(0, currentIndex)); } }
        catch (e) { console.error("DOM update error in deleteText:", e); }
        if (callback) callback();
    }

    function typeWaveReveal(elementId, targetText, callback) {
        const element = document.getElementById(elementId); if (!element) { if (callback) callback(); return; }
        const charsArray = targetText.split(""); element.innerHTML = charsArray.map(char => `<span style="opacity: 0">${char === ' ' ? ' ' : char}</span>`).join("");
        element.setAttribute("data-text", targetText); let index = 0;
        function revealChar() {
            if (index < charsArray.length) {
                const spans = element.querySelectorAll("span");
                if (spans[index]) { spans[index].style.animation = "rippleWave 0.5s ease forwards"; spans[index].style.opacity = "1"; index++; setTimeout(revealChar, 100); }
                else { index++; setTimeout(revealChar, 0); }
            } else { if (callback) callback(); }
        }
        revealChar();
    }

    function deleteWaveReveal(elementId, targetText, callback) {
        const element = document.getElementById(elementId); if (!element) { if (callback) callback(); return; }
        let index = targetText.length - 1;
        function hideChar() {
            if (index >= 0) {
                const spans = element.querySelectorAll("span");
                if (spans[index]) { spans[index].style.animation = ""; spans[index].style.opacity = 0; spans[index].style.transform = "translateY(20px) scale(0.8)"; index--; setTimeout(hideChar, 100); }
                else { index--; setTimeout(hideChar, 0); }
            } else { if (element) { element.innerHTML = ""; element.setAttribute("data-text", ""); } if (callback) callback(); }
        }
        hideChar();
    }

    function typeWaveFlow(elementId, targetText, callback) {
        const element = document.getElementById(elementId); if (!element) { if (callback) callback(); return; }
        const charsArray = targetText.split(""); element.innerHTML = charsArray.map(char => `<span style="opacity: 0">${char === ' ' ? ' ' : char}</span>`).join("");
        element.setAttribute("data-text", targetText); let index = 0;
        function revealChar() {
            if (index < charsArray.length) {
                const spans = element.querySelectorAll("span");
                if (spans[index]) { spans[index].style.animation = "waveFlow 0.5s ease forwards"; spans[index].style.opacity = 1; index++; setTimeout(revealChar, 50); }
                else { index++; setTimeout(revealChar, 0); }
            } else { if (callback) callback(); }
        }
        revealChar();
    }

    function deleteWaveFlow(elementId, targetText, callback) {
        const element = document.getElementById(elementId); if (!element) { if (callback) callback(); return; }
        let index = targetText.length - 1;
        function hideChar() {
            if (index >= 0) {
                const spans = element.querySelectorAll("span");
                if (spans[index]) { spans[index].style.animation = ""; spans[index].style.opacity = 0; spans[index].style.transform = "translateX(-100px) rotate(-45deg)"; index--; setTimeout(hideChar, 50); }
                else { index--; setTimeout(hideChar, 0); }
            } else { if (element) { element.innerHTML = ""; element.setAttribute("data-text", ""); } if (callback) callback(); }
        }
        hideChar();
    }

    function typeName(currentCycleId) {
        if (currentCycleId !== nameAnimationCycleId || !isAuthenticated || !headerName) return;
        const currentTheme = html.getAttribute("data-theme");
        if (currentTheme === "light") {
            typeWaveReveal("header-name", nameText, () => {
                setTimeout(() => {
                    if (currentCycleId !== nameAnimationCycleId) return;
                    deleteWaveReveal("header-name", nameText, () => setTimeout(() => typeName(currentCycleId), 2000));
                }, 2000);
            });
        } else {
            if (isNameTyping && nameCharIndex < nameText.length) {
                nameCharIndex++;
                typePasswordGuess(headerName, nameText, nameCharIndex, () => {
                    if (currentCycleId !== nameAnimationCycleId) return;
                    if (nameCharIndex === nameText.length) { isNameTyping = false; setTimeout(() => typeName(currentCycleId), 1000); }
                    else { setTimeout(() => typeName(currentCycleId), 100); }
                });
            } else if (!isNameTyping && nameCharIndex > 0) {
                nameCharIndex--;
                deleteText(headerName, nameText, nameCharIndex, () => {
                    if (currentCycleId !== nameAnimationCycleId) return;
                    if (nameCharIndex === 0) { isNameTyping = true; setTimeout(() => typeName(currentCycleId), 1000); }
                    else { setTimeout(() => typeName(currentCycleId), 150); }
                });
            } else { isNameTyping = true; nameCharIndex = 0; setTimeout(() => typeName(currentCycleId), 1000); }
        }
    }

    function typeMessage(currentCycleId) {
        if (currentCycleId !== messageAnimationCycleId || !isAuthenticated || !typingElement) return;
        const currentTheme = html.getAttribute("data-theme");
        const currentMessage = messages[messageIndex];
        if (currentTheme === "light") {
            typeWaveFlow("typing", currentMessage, () => {
                setTimeout(() => {
                    if (currentCycleId !== messageAnimationCycleId) return;
                    deleteWaveFlow("typing", currentMessage, () => {
                        messageIndex = (messageIndex + 1) % messages.length;
                        setTimeout(() => typeMessage(currentCycleId), 2000);
                    });
                }, 4000);
            });
        } else {
            if (isTyping && messageCharIndex < currentMessage.length) {
                messageCharIndex++;
                typePasswordGuess(typingElement, currentMessage, messageCharIndex, () => {
                    if (currentCycleId !== messageAnimationCycleId) return;
                    if (messageCharIndex === currentMessage.length) { isTyping = false; setTimeout(() => typeMessage(currentCycleId), 1000); }
                    else { typeMessage(currentCycleId); }
                });
            } else if (!isTyping && messageCharIndex > 0) {
                messageCharIndex--;
                deleteText(typingElement, currentMessage, messageCharIndex, () => {
                    if (currentCycleId !== messageAnimationCycleId) return;
                    if (messageCharIndex === 0) { isTyping = true; messageIndex = (messageIndex + 1) % messages.length; setTimeout(() => typeMessage(currentCycleId), 1000); }
                    else { setTimeout(() => typeMessage(currentCycleId), 150); }
                });
            } else { isTyping = true; messageIndex = (messageIndex + 1) % messages.length; messageCharIndex = 0; setTimeout(() => typeMessage(currentCycleId), 1000); }
        }
    }

    function startMainContent() {
        document.body.style.overflow = "auto";
        document.querySelectorAll('.header, .section, .footer').forEach(el => {
             el.style.display = '';
             el.style.opacity = '0';
             void el.offsetWidth;
        });

        if (headerName) {
            if (html.getAttribute("data-theme") === "light") headerName.innerHTML = nameText.split("").map(char => `<span style="opacity: 0">${char === ' ' ? ' ' : char}</span>`).join("");
            else headerName.innerHTML = Array(nameText.length).fill(0).map(() => getRandomChar()).join('');
            nameAnimationCycleId++; setTimeout(() => typeName(nameAnimationCycleId), 500);
        }
        if (typingElement) {
            if (html.getAttribute("data-theme") === "light") typingElement.innerHTML = "";
            messageAnimationCycleId++; setTimeout(() => typeMessage(messageAnimationCycleId), 750);
        }
    }

    function createMatrixEffect(canvasId, isSplash = false) {
        const canvas = document.getElementById(canvasId); if (!canvas) return () => {};
        const ctx = canvas.getContext("2d"); if (!ctx) return () => {};
        let animationFrameId;
        function resizeCanvas() {
            canvas.height = window.innerHeight; canvas.width = window.innerWidth;
            columns = Math.ceil(canvas.width / (fontSize * (isMobile ? 1.5 : 1)));
            drops = Array(columns).fill(1).map(() => Math.random() * canvas.height);
            if (typeof draw === 'function') draw(true); // Force redraw on resize
        }
        const isMobile = window.innerWidth <= 768; const fontSize = isMobile ? 10 : 12;
        let columns, drops; resizeCanvas();

        function draw(forceRedraw = false) {
            ctx.fillStyle = isSplash ? "rgba(26, 26, 26, 0.05)" : "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            let accentColor = getComputedStyle(html).getPropertyValue('--accent').trim() || "#4ade80";
            ctx.fillStyle = accentColor; ctx.font = `${fontSize}px 'Fira Code', monospace`;
            for (let i = 0; i < columns; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(text, i * fontSize * (isMobile ? 1.5 : 1), drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
            animationFrameId = requestAnimationFrame(() => draw()); // Continue animation loop
        }
        draw(true);
        window.addEventListener("resize", resizeCanvas);
        return () => { if (animationFrameId) cancelAnimationFrame(animationFrameId); window.removeEventListener("resize", resizeCanvas); };
    }
    let cleanupMatrixBg, cleanupMatrixSplash;

    let cleanupWaveBg;
    function createWaveEffect(canvasId) {
        const canvas = document.getElementById(canvasId); if (!canvas) return () => {};
        const ctx = canvas.getContext("2d"); if (!ctx) return () => {};
        let animationFrameId; let time = 0; const waveSpeed = 0.02;
        let waveHeight, waveLength;
        let isScrolling = false;
        let scrollTimeout;
        const SCROLL_REDRAW_THROTTLE = 50;
        let lastScrollRedrawTime = 0;

        function actualDrawWave() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let accentRGB = getComputedStyle(html).getPropertyValue('--accent-rgb').trim() || "142, 36, 170";
            ctx.fillStyle = `rgba(${accentRGB}, 0.3)`; ctx.beginPath();
            for (let x = 0; x <= canvas.width; x += 5) { ctx.lineTo(x, canvas.height * 0.7 + Math.sin((x / waveLength + time)) * waveHeight); }
            ctx.lineTo(canvas.width, canvas.height); ctx.lineTo(0, canvas.height); ctx.closePath(); ctx.fill();
            ctx.fillStyle = `rgba(${accentRGB}, 0.2)`; ctx.beginPath();
            for (let x = 0; x <= canvas.width; x += 5) { ctx.lineTo(x, canvas.height * 0.75 + Math.sin((x / (waveLength * 0.8) + time * 1.2) + 1) * (waveHeight * 0.7)); }
            ctx.lineTo(canvas.width, canvas.height); ctx.lineTo(0, canvas.height); ctx.closePath(); ctx.fill();
        }

        function renderLoop(forceRedraw = false) {
            const now = Date.now();
            let didDraw = false;

            if (forceRedraw || !isScrolling || (now - lastScrollRedrawTime > SCROLL_REDRAW_THROTTLE)) {
                actualDrawWave();
                lastScrollRedrawTime = now;
                didDraw = true;
            }

            if (!isScrolling || didDraw) { // Only increment time if not scrolling OR if a draw occurred
                time += waveSpeed;
            }

            animationFrameId = requestAnimationFrame(() => renderLoop(false));
        }

        function resizeCanvas() {
            canvas.height = window.innerHeight; canvas.width = window.innerWidth;
            waveHeight = canvas.height / 5; waveLength = canvas.width / 3;
            renderLoop(true);
        }
        resizeCanvas();

        function handleScroll() {
            isScrolling = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
                renderLoop(true);
            }, 150);
        }

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("scroll", handleScroll, { passive: true });

        renderLoop(true);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("scroll", handleScroll);
        };
    }

    function createWaveTransition(canvasId, callback) {
        const canvas = document.getElementById(canvasId); if (!canvas) { if (callback) callback(); return; }
        const ctx = canvas.getContext("2d"); canvas.height = window.innerHeight; canvas.width = window.innerWidth; canvas.style.display = "block";
        let progress = 0; const duration = 1.5; let startTime = null;
        function drawTransition(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = (currentTime - startTime) / 1000; progress = Math.min(elapsed / duration, 1);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let accentRGB = getComputedStyle(html).getPropertyValue('--accent-rgb').trim() || "142, 36, 170";
            ctx.fillStyle = `rgba(${accentRGB}, 0.8)`; ctx.beginPath();
            const waveTopY = canvas.height * (1 - progress);
            for (let x = 0; x <= canvas.width; x += 10) { ctx.lineTo(x, waveTopY + Math.sin((x / (canvas.width / 8)) + progress * Math.PI * 2) * (canvas.height / 6) * (1-progress*0.5)); }
            ctx.lineTo(canvas.width, canvas.height); ctx.lineTo(0, canvas.height); ctx.closePath(); ctx.fill();
            if (progress < 1) { requestAnimationFrame(drawTransition); } else { canvas.style.display = "none"; if (callback) callback(); }
        }
        requestAnimationFrame(drawTransition);
    }

    function createMatrixPasswordTransition(canvasId, callback) {
        const canvas = document.getElementById(canvasId); if (!canvas) { if (callback) callback(); return; }
        const ctx = canvas.getContext("2d"); canvas.height = window.innerHeight; canvas.width = window.innerWidth; canvas.style.display = "block";
        let progress = 0; const duration = 1.5; const fontSize = 14;
        let columns = Math.floor(canvas.width / fontSize); let drops = Array(columns).fill(0).map(() => Math.random() * canvas.height / fontSize);
        let startTime = null;
        function drawTransition(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = (currentTime - startTime) / 1000; progress = Math.min(elapsed / duration, 1);
            if (progress < 0.5) { ctx.fillStyle = `rgba(26, 26, 26, ${progress * 2})`; } else { ctx.fillStyle = "rgba(26, 26, 26, 1)"; }
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            if (progress > 0.3) {
                let accentColor = getComputedStyle(html).getPropertyValue('--accent').trim() || "#4ade80";
                ctx.fillStyle = accentColor; ctx.globalAlpha = Math.min(1, (progress - 0.3) / 0.7) * 0.8;
                ctx.font = `${fontSize}px 'Fira Code', monospace`;
                for (let i = 0; i < columns; i++) {
                    const text = chars.charAt(Math.floor(Math.random() * chars.length));
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) drops[i] = 0; drops[i]++;
                }
                ctx.globalAlpha = 1;
            }
            if (progress < 1) { requestAnimationFrame(drawTransition); } else { canvas.style.display = "none"; if (callback) callback(); }
        }
        requestAnimationFrame(drawTransition);
    }

    function revealPasswordCharByChar(displayElement, actualInputElement, targetPassword, finalCallback) {
        if (!displayElement || !actualInputElement) { if (finalCallback) finalCallback(); return; }
        let currentRevealedPassword = ""; let charRevealIndex = 0;
        const maxAttemptsPerChar = 8, randomCharCycleSpeed = 50, interCharRevealDelay = 100;

        function revealNextChar() {
            if (charRevealIndex < targetPassword.length) {
                const targetChar = targetPassword[charRevealIndex]; let attempts = 0;
                function animateCharReveal() {
                    if (attempts < maxAttemptsPerChar) {
                        displayElement.innerHTML = `Enter Password: ${currentRevealedPassword}${getRandomChar()}<span class="cursor">_</span>`;
                        attempts++; setTimeout(animateCharReveal, randomCharCycleSpeed);
                    } else {
                        currentRevealedPassword += targetChar;
                        displayElement.innerHTML = `Enter Password: ${currentRevealedPassword}<span class="cursor">_</span>`;
                        actualInputElement.value = currentRevealedPassword;
                        charRevealIndex++; setTimeout(revealNextChar, interCharRevealDelay);
                    }
                }
                animateCharReveal();
            } else {
                displayElement.innerHTML = `Enter Password: ${currentRevealedPassword}<span class="cursor">_</span>`;
                actualInputElement.value = targetPassword;
                if (finalCallback) finalCallback();
            }
        }
        revealNextChar();
    }

    async function showIpWarningAndProceed() {
        ipWarningPopup.style.display = 'flex';
        if (passwordPrompt) {
            passwordPrompt.classList.remove('visible');
            passwordPrompt.style.display = 'none';
        }
        if (passwordInput) passwordInput.disabled = true;

        try {
            const response = await fetch('https://ipinfo.io/json');
            if (!response.ok) throw new Error('Failed to fetch IP info');
            const data = await response.json();
            if(userIpElement) userIpElement.textContent = data.ip || 'Unknown';
            if(userLocationElement) userLocationElement.textContent = `${data.city || 'Unknown City'}, ${data.region || 'Unknown Region'}, ${data.country || 'Unknown Country'}`;
        } catch (error) {
            console.error("Error fetching IP/Location:", error);
            if(userIpElement) userIpElement.textContent = 'Unavailable';
            if(userLocationElement) userLocationElement.textContent = 'Unavailable';
        }
    }

    if(warningOkButton) {
        warningOkButton.addEventListener('click', () => {
            ipWarningPopup.style.display = 'none';
            setTimeout(createHackingShow, 100);
        });
    }

    function createHackingShow() {
        if (!hackingCode || !passwordStatus || !passwordPrompt || !passwordText || !passwordInput) {
            console.error("One or more elements required for hacking show are missing.");
            return;
        }

        const originalThemeBeforeHack = html.getAttribute("data-theme") || FORCED_INITIAL_THEME;
        html.setAttribute("data-theme", "red");

        passwordPrompt.style.display = 'flex';
        passwordPrompt.classList.add('visible');
        if (passwordText) passwordText.innerHTML = 'Enter Password: <span class="cursor">_</span>';
        if (passwordInput) {
            passwordInput.value = "";
            passwordInput.disabled = true;
        }

        const codeLines = [
            "Establishing secure connection to remote host...",
            "Initiating Nmap scan on target IP: 127.0.0.1...",
            "Nmap scan report for 127.0.0.1 (localhost)",
            "Host is up (0.00012s latency).",
            "Not shown: 997 filtered tcp ports (no-response)",
            "PORT    STATE SERVICE VERSION",
            "22/tcp  open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.4 (Ubuntu Linux; protocol 2.0)",
            "80/tcp  open  http    Apache httpd 2.4.41 ((Ubuntu))",
            "443/tcp open  ssl/http Apache httpd 2.4.41 ((Ubuntu))",
            "Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel",
            "Vulnerability assessment: Checking CVE database for Apache/2.4.41...",
            "CVE-2024-XXXX found for Apache server. High severity. Remote Code Execution.",
            "Loading Metasploit Framework console...",
            "[msf6 >] use exploit/unix/httpd/apache_mod_rewrite_rce",
            "[msf6 exploit(apache_mod_rewrite_rce) >] set RHOSTS 127.0.0.1",
            "[msf6 exploit(apache_mod_rewrite_rce) >] set LHOST 192.168.1.101",
            "[msf6 exploit(apache_mod_rewrite_rce) >] exploit -z",
            "[*] Exploit completed, but no session was created.",
            "[*] Fallback: Attempting SSH brute-force with Hydra using common creds...",
            "Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at $(date)",
            "[DATA] max 16 tasks per 1 server, overall 16 tasks, 240 login tries (l:15/p:16).",
            "[STATUS] attack finished for 127.0.0.1 (waiting for children to complete)",
            "[22][ssh] host: 127.0.0.1 login: vihaan password: <PASSWORD_PLACEHOLDER>",
            "Found SSH credentials. Establishing connection...",
            "Executing Python exploit for privilege escalation (dirty_sock_v2.py)...",
            "Running /tmp/dirty_sock_v2.py ... SUCCESS!",
            "UID changed to 0. Root access obtained.",
            "root@VIHAAN-SERVER:/# cat /etc/shadow | grep vihaan",
            "vihaan:$6$a_very_long_encrypted_hash_for_vihaan:19000:0:99999:7:::",
            "Decrypting vihaan's shadow entry using hashcat with rockyou.txt...",
            `[##################] 100% - Password found: ${correctPassword}`,
            "Injecting authentication bypass via /etc/pam.d/common-auth...",
            "sed -i 's/auth       [success=1 default=ignore] pam_unix.so nullok_secure/auth       [success=1 default=ignore] pam_permit.so/g' /etc/pam.d/common-auth",
            "Authentication modules overridden. System compromised.",
            "ACCESS GRANTED - Welcome, Vihaan."
        ].map(line => line.replace("<PASSWORD_PLACEHOLDER>", correctPassword));

        let lineIndex = 0;
        if(hackingCode) hackingCode.textContent = '';
        if(hackingCode) hackingCode.classList.add("visible");

        function displayCode() {
            if (lineIndex < codeLines.length) {
                const line = codeLines[lineIndex];
                if(hackingCode) {
                    hackingCode.textContent += (hackingCode.textContent ? "\n" : "") + line;
                    hackingCode.scrollTop = hackingCode.scrollHeight;
                }
                const isKeyFoundLine = line.includes(`Password found: ${correctPassword}`);
                lineIndex++;

                if (isKeyFoundLine) {
                    if(passwordInput) passwordInput.disabled = false;
                    revealPasswordCharByChar(passwordText, passwordInput, correctPassword, () => {
                        if(passwordInput) passwordInput.disabled = true;
                        let nextLineDelay = (lineIndex < codeLines.length && codeLines[lineIndex].match(/\[.*?\]/)) ? 500 : 300;
                        setTimeout(displayCode, nextLineDelay);
                    });
                } else {
                    setTimeout(displayCode, line.match(/\[.*?\]|meterpreter|root@|msf6|Hydra/) ? 400 : 200);
                }
            } else {
                if(passwordStatus) {
                    passwordStatus.textContent = "ACCESS GRANTED";
                    passwordStatus.style.color = '#4ade80';
                }
                setTimeout(() => {
                    if(passwordStatus) passwordStatus.style.color = '';
                    if(hackingCode) hackingCode.classList.remove("visible");
                    if(passwordPrompt) {
                        passwordPrompt.classList.remove("visible");
                        passwordPrompt.style.display = 'none';
                    }
                    html.setAttribute("data-theme", originalThemeBeforeHack);
                    isAuthenticated = true; startMainContent();
                }, 1000);
            }
        }
        displayCode();
    }

    function handlePasswordInput() {
        if (!passwordInput || !passwordText || !passwordStatus || !passwordPrompt) return;

        if (passwordPrompt.classList.contains('visible') && !isAuthenticated && passwordInput) {
             passwordInput.disabled = false;
        }

        passwordInput.addEventListener("input", () => {
            if (isAuthenticated || passwordInput.disabled) return;
            if (passwordText) passwordText.innerHTML = `Enter Password: ${passwordInput.value}<span class="cursor">_</span>`;
        });
        passwordInput.addEventListener("keypress", (e) => {
            if (isAuthenticated || passwordInput.disabled) return;
            if (e.key === "Enter") {
                e.preventDefault(); const enteredValue = passwordInput.value;
                if (enteredValue === correctPassword) {
                    if(passwordText) passwordText.innerHTML = `Enter Password: ${"•".repeat(enteredValue.length)}<span class="cursor">_</span>`;
                    if (passwordStatus) {
                        passwordStatus.textContent = "Access Granted";
                        html.style.setProperty('--password-status-color', '#4ade80');
                    }
                    if(passwordInput) passwordInput.disabled = true;
                    setTimeout(() => {
                        if (passwordStatus) html.style.setProperty('--password-status-color', 'var(--accent)');
                        if(passwordPrompt) {
                            passwordPrompt.classList.remove("visible");
                            passwordPrompt.style.display = 'none';
                        }
                        isAuthenticated = true; startMainContent();
                    }, 1000);
                } else {
                    if(passwordStatus) passwordStatus.textContent = "Access Denied";
                    if(passwordInput) {
                        passwordInput.value = "";
                        passwordInput.disabled = true;
                    }
                    showIpWarningAndProceed();
                }
            }
        });
    }

    const splash = document.getElementById("matrix-splash");
    const waveBgElement = document.getElementById("wave-bg");
    const matrixBgElement = document.getElementById("matrix-bg");

    if (initialAppTheme === "light") {
        if (waveBgElement) { waveBgElement.style.display = "block"; cleanupWaveBg = createWaveEffect("wave-bg"); }
        if (matrixBgElement) matrixBgElement.style.display = "none";
    } else {
        if (waveBgElement) waveBgElement.style.display = "none";
        if (matrixBgElement) { matrixBgElement.style.display = "block"; cleanupMatrixBg = createMatrixEffect("matrix-bg"); }
    }

    if (splash) {
        cleanupMatrixSplash = createMatrixEffect("matrix-splash", true);
        setTimeout(() => {
            if(cleanupMatrixSplash) cleanupMatrixSplash();
            splash.classList.add("hidden");

            if (passwordPrompt) {
                document.body.style.overflow = "hidden";
                passwordPrompt.classList.add("visible");
                if (passwordInput) {
                    passwordInput.disabled = false;
                    setTimeout(attemptFocusOnPasswordInput, 150);
                }
            } else {
                isAuthenticated = true;
                startMainContent();
            }
        }, splashDuration);
    } else {
        if (passwordPrompt) {
            document.body.style.overflow = "hidden";
            passwordPrompt.classList.add("visible");
            if (passwordInput) {
                passwordInput.disabled = false;
                setTimeout(attemptFocusOnPasswordInput, 150);
            }
        } else {
            isAuthenticated = true;
            startMainContent();
        }
    }

    handlePasswordInput();

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project");
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => { btn.classList.remove("active"); btn.setAttribute("aria-selected", "false"); });
            button.classList.add("active"); button.setAttribute("aria-selected", "true");
            const filter = button.dataset.filter;

            projects.forEach(project => {
                const projectCategories = project.dataset.category.split(' ');
                const matchesFilter = (filter === "all" || projectCategories.includes(filter));

                project.classList.toggle("hidden", !matchesFilter);
                if (matchesFilter) {
                    void project.offsetWidth;
                }
            });
        });
        button.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                button.click();
            }
        });
    });

    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    projects.forEach(project => {
        if (isTouchDevice() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            project.addEventListener("touchstart", () => { project.style.transform = "scale(1.05)"; project.style.setProperty("box-shadow", "0 0 8px var(--accent)"); }, { passive: true });
            project.addEventListener("touchend", () => { project.style.transform = "scale(1)"; project.style.setProperty("box-shadow", "none"); }, { passive: true });
        }
        project.addEventListener("click", (e) => {
            const currentTheme = html.getAttribute("data-theme") || FORCED_INITIAL_THEME;
            const themeAnnouncer = document.getElementById("theme-announcer");
            let tempThemeAttr = "";
            if (currentTheme === "dark") { if (themeAnnouncer) themeAnnouncer.textContent = "Activating temporary red theme."; tempThemeAttr = "dark-to-red"; }
            else if (currentTheme === "light") { if (themeAnnouncer) themeAnnouncer.textContent = "Activating temporary complementary theme."; tempThemeAttr = "light"; }
            if (tempThemeAttr) {
                html.setAttribute("data-theme-temp", tempThemeAttr);
                setTimeout(() => {
                    if (themeAnnouncer) themeAnnouncer.textContent = `Reverting to ${currentTheme} theme.`;
                    html.removeAttribute("data-theme-temp");
                    if (themeAnnouncer) setTimeout(() => { if(themeAnnouncer) themeAnnouncer.textContent = "";}, 1000);
                }, 5000);
            }
        });
    });

    const matrixBgInteractionCanvas = document.getElementById("matrix-bg");
    if (matrixBgInteractionCanvas) {
        let lastClickTime = 0;
        matrixBgInteractionCanvas.addEventListener("click", (e) => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            const now = Date.now(); if (now - lastClickTime < 300) return; lastClickTime = now;
            const tempCanvas = document.createElement("canvas");
            Object.assign(tempCanvas.style, { position: "fixed", zIndex: "0", pointerEvents: "none" });
            tempCanvas.width = 200; tempCanvas.height = 200;
            tempCanvas.style.left = `${e.clientX - tempCanvas.width / 2}px`; tempCanvas.style.top = `${e.clientY - tempCanvas.height / 2}px`;
            document.body.appendChild(tempCanvas);
            const ctx = tempCanvas.getContext("2d");
            const particles = Array.from({ length: 50 + Math.random() * 50 }, () => ({ x: tempCanvas.width / 2, y: tempCanvas.height / 2, angle: Math.random() * Math.PI * 2, speed: 40 + Math.random() * 80, char: Math.random() > 0.5 ? "1" : "0", opacity: 1, scale: 0.8 + Math.random() * 0.4 }));
            let startTime = null, lastFrameTime = 0; const animationDuration = 0.8 + Math.random() * 0.4;
            function animateParticles(currentTime) {
                if (!startTime) { startTime = currentTime; lastFrameTime = currentTime; }
                const totalElapsed = (currentTime - startTime) / 1000; const deltaTime = (currentTime - lastFrameTime) / 1000; lastFrameTime = currentTime;
                ctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
                let particleColor = getComputedStyle(html).getPropertyValue('--accent').trim() || "#4ade80";
                particles.forEach(p => {
                    p.x += Math.cos(p.angle) * p.speed * deltaTime; p.y += Math.sin(p.angle) * p.speed * deltaTime;
                    p.opacity = Math.max(0, 1 - (totalElapsed / animationDuration) ** 2); p.scale *= (1 - (totalElapsed / animationDuration) * 0.3);
                    ctx.globalAlpha = p.opacity; ctx.fillStyle = particleColor; ctx.font = `${Math.max(4, 12 * p.scale)}px 'Fira Code', monospace`; ctx.fillText(p.char, p.x, p.y);
                });
                if (totalElapsed < animationDuration) requestAnimationFrame(animateParticles);
                else if (tempCanvas.parentNode) document.body.removeChild(tempCanvas);
            }
            requestAnimationFrame(animateParticles);
        });
    }

    const themeToggle = document.querySelector(".theme-toggle");
    const themeIconElement = themeToggle ? themeToggle.querySelector(".theme-icon") : null;
    const themeAnnouncer = document.getElementById("theme-announcer");
    const sunIconPath = "M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z";
    const moonIconPath = "M216.4 130.4c1.8-4.3 6-7.3 10.7-7.3s8.9 3 10.7 7.3l34.7 83.4 92.1 13.4c4.6.7 8.2 4.3 8.9 8.9s-1.5 9.2-5.8 11.9l-66.7 65 15.7 91.7c.8 4.6-1.4 9.2-5.7 11.7s-9.1 1.5-12.8-1.9l-82.3-43.3-82.3 43.3c-3.7 1.9-8.1 1.5-11.7-1.9s-6.5-7.1-5.7-11.7l15.7-91.7-66.7-65c-4.3-2.6-7.6-7.3-5.8-11.9s4.3-8.2 8.9-8.9l92.1-13.4L216.4 130.4zm139.8 263.9c-100.5 0-182.2 81.7-182.2 182.2 0 19.1 3 37.6 8.6 55.1C123.9 595.1 0 475.5 0 320.4 0 150.3 130.1 20.2 300.2 20.2c123.3 0 229.1 72.3 276.2 175.5-2.9-.2-5.8-.2-8.8-.2-100.5.1-182.2 81.8-182.2 182.3z";

    if (themeIconElement) {
        themeIconElement.innerHTML = `<path d="${initialAppTheme === "dark" ? sunIconPath : moonIconPath}"/>`;
    }

    function updateThemeUI(theme) {
        html.setAttribute("data-theme", theme);
        html.removeAttribute("data-theme-temp");
        try { localStorage.setItem("theme", theme); } catch (e) { console.warn("localStorage error:", e); }

        if (themeIconElement) { themeIconElement.innerHTML = `<path d="${theme === "dark" ? sunIconPath : moonIconPath}" />`; }
        if (themeAnnouncer) {
            themeAnnouncer.textContent = `Theme set to ${theme} mode.`;
            setTimeout(() => { if(themeAnnouncer) themeAnnouncer.textContent = ""; }, 2000);
        }

        const waveBg = document.getElementById("wave-bg"); const matrixBg = document.getElementById("matrix-bg");
        if (cleanupWaveBg) cleanupWaveBg(); cleanupWaveBg = null;
        if (cleanupMatrixBg) cleanupMatrixBg(); cleanupMatrixBg = null;

        if (theme === "light") {
            if (matrixBg) matrixBg.style.display = "none";
            if (waveBg) { waveBg.style.display = "block"; cleanupWaveBg = createWaveEffect("wave-bg"); }
        } else {
            if (waveBg) waveBg.style.display = "none";
            if (matrixBg) { matrixBg.style.display = "block"; cleanupMatrixBg = createMatrixEffect("matrix-bg"); }
        }

        if (isAuthenticated) {
            nameAnimationCycleId++; messageAnimationCycleId++;
            nameCharIndex = 0; isNameTyping = true;
            messageCharIndex = 0; isTyping = true;

            if(headerName && typeof headerName.innerHTML === 'string') headerName.innerHTML = "";
            if(typingElement && typeof typingElement.innerHTML === 'string') typingElement.innerHTML = "";
            
            requestAnimationFrame(() => {
                typeName(nameAnimationCycleId);
                typeMessage(messageAnimationCycleId);
            });
        }
    }

    function switchTheme(newTheme) {
        const waveTransitionCanvas = document.getElementById("wave-transition");
        const currentTheme = html.getAttribute("data-theme") || FORCED_INITIAL_THEME;
        if (newTheme === currentTheme) return;

        if(isAuthenticated) {
            nameAnimationCycleId++; messageAnimationCycleId++;
            if(headerName && typeof headerName.innerHTML === 'string') headerName.innerHTML = "";
            if(typingElement && typeof typingElement.innerHTML === 'string') typingElement.innerHTML = "";
        }

        if (!waveTransitionCanvas) { updateThemeUI(newTheme); return; }
        if (newTheme === "light") createWaveTransition("wave-transition", () => updateThemeUI("light"));
        else createMatrixPasswordTransition("wave-transition", () => updateThemeUI(newTheme));
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = html.getAttribute("data-theme") || FORCED_INITIAL_THEME;
            switchTheme(currentTheme === "dark" ? "light" : "dark");
        });
    }
})();
