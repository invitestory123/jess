/* ==========================================================================
   PREMIUM CINEMATIC DIGITAL WEDDING INVITATION — JESSICA & DWIJ
   COMBINED LOGIC & ANIMATION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Element References
  const posterImg = document.getElementById('doorPoster');
  const video = document.getElementById('doorVideo');
  const staticCanvas = document.getElementById('staticFrameCanvas');
  const canvasCtx = staticCanvas ? staticCanvas.getContext('2d') : null;
  
  const tapOverlay = document.getElementById('tapOverlay');
  const invitationOverlay = document.getElementById('invitationOverlay');
  const contentScrollable = document.getElementById('contentScrollable');
  
  // Controls & Buttons
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioIconOn = document.getElementById('audioIconOn');
  const audioIconOff = document.getElementById('audioIconOff');
  const replayBtn = document.getElementById('replayBtn');
  const replayHeaderBtn = document.getElementById('replayHeaderBtn');
  const addToCalendarBtn = document.getElementById('addToCalendarBtn');

  // Application State
  let isAudioMuted = false;
  let isPlaying = false;
  let hasOpened = false;
  let audioCtx = null;

  // --- Audio Context Helper for Ambient Chime ---
  function initAudioContext() {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playAuspiciousChime() {
    if (isAudioMuted || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      // Soft temple bell / chime frequency chord
      const freqs = [528, 660, 792, 1056];
      freqs.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);
        gain.gain.setValueAtTime(0.001, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.12 / (i + 1), now + i * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 2.8);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 3.0);
      });
    } catch (e) {
      // Audio fallback silent
    }
  }

  // --- 1. Floating Sky Lanterns 3D Depth Engine ---
  function initFloatingLanterns() {
    const container = document.getElementById('lanternsContainer');
    if (!container) return;

    container.innerHTML = '';
    const lanternCount = 20;
    const depthTiers = ['depth-far', 'depth-far', 'depth-mid', 'depth-mid', 'depth-near'];

    for (let i = 0; i < lanternCount; i++) {
      const lantern = document.createElement('div');
      const depthClass = depthTiers[Math.floor(Math.random() * depthTiers.length)];
      lantern.className = `lantern-item ${depthClass}`;

      const leftPos = (Math.random() * 90 + 5).toFixed(1);
      const duration = (Math.random() * 12 + 14).toFixed(1);
      const delay = (Math.random() * 16).toFixed(1);
      const swayX = (Math.random() * 20 + 8).toFixed(0);
      const rotDeg = (Math.random() * 6 - 3).toFixed(1);

      lantern.style.left = `${leftPos}%`;
      lantern.style.animationDuration = `${duration}s`;
      lantern.style.animationDelay = `${delay}s`;
      lantern.style.setProperty('--sway-x', `${swayX}px`);
      lantern.style.setProperty('--rot-deg', `${rotDeg}deg`);

      lantern.innerHTML = `
        <div class="lantern-paper">
          <div class="lantern-core-flame"></div>
        </div>
        <div class="lantern-tassel"></div>
      `;

      container.appendChild(lantern);
    }
  }

  initFloatingLanterns();

  // --- Capture Final Video Frame for 100% Static Hold ---
  function freezeFinalFrame() {
    if (video && staticCanvas && canvasCtx && video.videoWidth && video.videoHeight) {
      staticCanvas.width = video.videoWidth;
      staticCanvas.height = video.videoHeight;
      canvasCtx.drawImage(video, 0, 0, staticCanvas.width, staticCanvas.height);
      staticCanvas.classList.add('active');
      video.pause();
    }
  }

  // --- Helper: Reveal Invitation Content ---
  function revealInvitationContent() {
    freezeFinalFrame();
    hasOpened = true;
    isPlaying = false;

    if (invitationOverlay) {
      invitationOverlay.classList.remove('hidden');
      void invitationOverlay.offsetWidth;
      invitationOverlay.classList.add('revealed');
    }

    playAuspiciousChime();

    setTimeout(() => {
      initScratchCanvas();
    }, 200);
  }

  // --- Door Opening Interaction Handler ---
  function openDoorInvitation() {
    if (isPlaying || hasOpened) return;
    
    isPlaying = true;
    initAudioContext();

    if (tapOverlay) tapOverlay.classList.add('fade-out');
    if (posterImg) posterImg.classList.add('fade-out');
    if (staticCanvas) staticCanvas.classList.remove('active');
    
    if (video) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser blocked video autoplay
          revealInvitationContent();
        });
      }
    } else {
      revealInvitationContent();
    }
  }

  if (tapOverlay) {
    tapOverlay.addEventListener('click', openDoorInvitation);
  }

  if (video) {
    video.addEventListener('timeupdate', () => {
      if (!hasOpened && (video.currentTime >= 5.8 || video.ended)) {
        revealInvitationContent();
      }
    });

    video.addEventListener('ended', () => {
      freezeFinalFrame();
      if (!hasOpened) {
        revealInvitationContent();
      }
    });
  }

  // --- Replay Opening Experience ---
  function resetAndReplay() {
    hasOpened = false;
    isPlaying = false;
    hasScratchedCleared = false;

    if (invitationOverlay) {
      invitationOverlay.classList.remove('revealed');
      setTimeout(() => {
        invitationOverlay.classList.add('hidden');
      }, 500);
    }

    if (contentScrollable) {
      contentScrollable.scrollTop = 0;
    }

    if (staticCanvas) staticCanvas.classList.remove('active');
    if (posterImg) posterImg.classList.remove('fade-out');
    if (tapOverlay) tapOverlay.classList.remove('fade-out');

    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    if (scratchCanvas) {
      scratchCanvas.classList.remove('fade-out');
      scratchCanvas.style.opacity = '1';
      scratchCanvas.style.pointerEvents = 'auto';
    }
    if (scratchHint) scratchHint.style.opacity = '1';
    if (quickRevealBtn) quickRevealBtn.style.display = 'block';

    initFloatingLanterns();
  }

  if (replayBtn) replayBtn.addEventListener('click', resetAndReplay);
  if (replayHeaderBtn) replayHeaderBtn.addEventListener('click', resetAndReplay);

  // Audio Toggle
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      isAudioMuted = !isAudioMuted;
      if (audioIconOn) audioIconOn.classList.toggle('hidden', isAudioMuted);
      if (audioIconOff) audioIconOff.classList.toggle('hidden', !isAudioMuted);
      if (!isAudioMuted) initAudioContext();
    });
  }

  // Forward desktop wheel scrolling to content-scrollable container
  window.addEventListener('wheel', (e) => {
    if (hasOpened && contentScrollable) {
      contentScrollable.scrollTop += e.deltaY;
    }
  }, { passive: true });

  // --- 3. HTML5 Scratch Card Engine (May 7 & 8, 2027) ---
  const scratchCanvas = document.getElementById('scratchCanvas');
  const scratchHint = document.getElementById('scratchHint');
  const quickRevealBtn = document.getElementById('quickRevealBtn');
  let scratchCtx = null;
  let isScratching = false;
  let hasScratchedCleared = false;
  let dragCount = 0;

  function initScratchCanvas() {
    if (!scratchCanvas) return;
    scratchCtx = scratchCanvas.getContext('2d');
    
    const container = document.getElementById('scratchContainer');
    if (!container) return;
    
    scratchCanvas.width = container.offsetWidth || 340;
    scratchCanvas.height = container.offsetHeight || 135;
    
    // Metallic Gold Foil Gradient
    const grad = scratchCtx.createLinearGradient(0, 0, scratchCanvas.width, scratchCanvas.height);
    grad.addColorStop(0, '#E5C158');
    grad.addColorStop(0.3, '#FFF4D0');
    grad.addColorStop(0.65, '#D4A338');
    grad.addColorStop(1, '#A67C1E');
    
    scratchCtx.fillStyle = grad;
    scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
    
    // Shimmering gold foil speckles
    scratchCtx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let i = 0; i < 180; i++) {
      const x = Math.random() * scratchCanvas.width;
      const y = Math.random() * scratchCanvas.height;
      const r = Math.random() * 2.2 + 0.5;
      scratchCtx.beginPath();
      scratchCtx.arc(x, y, r, 0, Math.PI * 2);
      scratchCtx.fill();
    }
    
    // Prompt text on gold foil
    scratchCtx.font = '600 13px Cinzel, serif';
    scratchCtx.fillStyle = 'rgba(18, 14, 8, 0.85)';
    scratchCtx.textAlign = 'center';
    scratchCtx.fillText('✦ SCRATCH TO REVEAL WEDDING DATES ✦', scratchCanvas.width / 2, scratchCanvas.height / 2 + 5);
  }

  function scratchAt(x, y) {
    if (!scratchCtx || hasScratchedCleared) return;
    
    scratchCtx.globalCompositeOperation = 'destination-out';
    scratchCtx.beginPath();
    scratchCtx.arc(x, y, 24, 0, Math.PI * 2);
    scratchCtx.fill();
    
    dragCount++;
    if (dragCount % 8 === 0) {
      checkScratchPercentage();
    }
  }

  function getScratchCoords(e) {
    const rect = scratchCanvas.getBoundingClientRect();
    let clientX = e.clientX;
    let clientY = e.clientY;
    
    if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function checkScratchPercentage() {
    if (hasScratchedCleared || !scratchCtx) return;
    
    try {
      const imgData = scratchCtx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
      const pixels = imgData.data;
      let transparentCount = 0;
      
      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) {
          transparentCount++;
        }
      }
      
      const totalSampled = pixels.length / 16;
      const ratio = transparentCount / totalSampled;
      
      if (ratio > 0.28) {
        revealDateFully();
      }
    } catch (e) {
      // Cross-origin fallback
    }
  }

  function revealDateFully() {
    if (hasScratchedCleared) return;
    hasScratchedCleared = true;
    
    if (scratchCanvas) {
      scratchCanvas.classList.add('fade-out');
      setTimeout(() => {
        scratchCanvas.style.pointerEvents = 'none';
      }, 500);
    }
    if (scratchHint) scratchHint.style.opacity = '0';
    if (quickRevealBtn) quickRevealBtn.style.display = 'none';
    
    triggerConfetti();
    playAuspiciousChime();
  }

  if (scratchCanvas) {
    ['mousedown', 'touchstart'].forEach(evt => {
      scratchCanvas.addEventListener(evt, (e) => {
        isScratching = true;
        const coords = getScratchCoords(e);
        scratchAt(coords.x, coords.y);
      }, { passive: true });
    });

    ['mousemove', 'touchmove'].forEach(evt => {
      scratchCanvas.addEventListener(evt, (e) => {
        if (!isScratching) return;
        const coords = getScratchCoords(e);
        scratchAt(coords.x, coords.y);
      }, { passive: true });
    });

    ['mouseup', 'mouseleave', 'touchend'].forEach(evt => {
      scratchCanvas.addEventListener(evt, () => {
        isScratching = false;
      });
    });
  }

  if (quickRevealBtn) {
    quickRevealBtn.addEventListener('click', revealDateFully);
  }

  // --- Confetti Particle Celebration Engine ---
  const confettiCanvas = document.getElementById('confettiCanvas');
  let confettiCtx = null;
  let confettiParticles = [];
  let confettiAnimationId = null;

  function triggerConfetti() {
    if (!confettiCanvas) return;
    confettiCtx = confettiCanvas.getContext('2d');
    
    const container = document.getElementById('invitationOverlay');
    confettiCanvas.width = container ? container.offsetWidth : window.innerWidth;
    confettiCanvas.height = container ? container.offsetHeight : window.innerHeight;
    
    const colors = ['#FFF4D0', '#E5C158', '#D4A338', '#FFFFFF', '#F5D77F', '#FF8E8E'];
    confettiParticles = [];
    
    for (let i = 0; i < 80; i++) {
      confettiParticles.push({
        x: confettiCanvas.width / 2 + (Math.random() * 80 - 40),
        y: confettiCanvas.height * 0.35,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() * -11) - 4,
        size: Math.random() * 7 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }
    
    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
    animateConfetti();
  }

  function animateConfetti() {
    if (!confettiCtx) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    let activeParticles = 0;
    
    confettiParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.28;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.009;
      
      if (p.opacity > 0) {
        activeParticles++;
        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate((p.rotation * Math.PI) / 180);
        confettiCtx.globalAlpha = Math.max(0, p.opacity);
        confettiCtx.fillStyle = p.color;
        confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        confettiCtx.restore();
      }
    });
    
    if (activeParticles > 0) {
      confettiAnimationId = requestAnimationFrame(animateConfetti);
    } else {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  // --- 4. Choose a Chapter Carousel Engine (Gilded Template) ---
  const chapterTabs = document.querySelectorAll('.chapter-tab-btn');
  const chapterCards = document.querySelectorAll('.chapter-card');
  const chapterDots = document.querySelectorAll('.chapter-dots .dot');
  const prevChapterBtn = document.getElementById('prevChapterBtn');
  const nextChapterBtn = document.getElementById('nextChapterBtn');
  const chapterStage = document.getElementById('chapterStage');
  
  let currentChapterIndex = 0;
  const totalChapters = chapterCards.length;

  function switchChapter(newIndex) {
    if (newIndex < 0) newIndex = totalChapters - 1;
    if (newIndex >= totalChapters) newIndex = 0;
    
    currentChapterIndex = newIndex;

    // Update Tab Buttons
    chapterTabs.forEach((tab, idx) => {
      const isActive = idx === currentChapterIndex;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update Cards
    chapterCards.forEach((card, idx) => {
      card.classList.toggle('active', idx === currentChapterIndex);
    });

    // Update Dots
    chapterDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentChapterIndex);
    });
  }

  chapterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-index'), 10);
      switchChapter(idx);
    });
  });

  if (prevChapterBtn) {
    prevChapterBtn.addEventListener('click', () => {
      switchChapter(currentChapterIndex - 1);
    });
  }

  if (nextChapterBtn) {
    nextChapterBtn.addEventListener('click', () => {
      switchChapter(currentChapterIndex + 1);
    });
  }

  chapterDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      switchChapter(idx);
    });
  });

  // Touch Swipe for Chapter Stage
  if (chapterStage) {
    let touchStartX = 0;
    let touchEndX = 0;

    chapterStage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    chapterStage.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          switchChapter(currentChapterIndex + 1); // Swipe left -> next
        } else {
          switchChapter(currentChapterIndex - 1); // Swipe right -> prev
        }
      }
    }
  }

  // --- 5. Live Countdown Timer Engine (May 7, 2027) ---
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');
  
  // Wedding Date Target: May 7, 2027 at 10:00 AM IST (+05:30)
  const targetWeddingDate = new Date('2027-05-07T10:00:00+05:30').getTime();

  function updateCountdown() {
    if (!cdDays || !cdHours || !cdMins || !cdSecs) return;
    
    const now = new Date().getTime();
    const distance = targetWeddingDate - now;
    
    if (distance <= 0) {
      cdDays.innerText = '00';
      cdHours.innerText = '00';
      cdMins.innerText = '00';
      cdSecs.innerText = '00';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    cdDays.innerText = days < 10 ? '0' + days : days;
    cdHours.innerText = hours < 10 ? '0' + hours : hours;
    cdMins.innerText = minutes < 10 ? '0' + minutes : minutes;
    cdSecs.innerText = seconds < 10 ? '0' + seconds : seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --- Add to Calendar Engine (.ics download & Google Calendar link) ---
  function handleAddToCalendar() {
    const title = encodeURIComponent("Jessica & Dwij's Royal Wedding Celebrations");
    const details = encodeURIComponent("Join us to celebrate the royal wedding of Jessica & Dwij. Manglik Prasango, Sangeet, Sacred Vivah & Grand Reception.\nVenue: The Grand Emerald Palace & Royal Pavilions, Udaipur.");
    const location = encodeURIComponent("The Grand Emerald Palace & Royal Pavilions, Lake Pichola, Udaipur, Rajasthan");
    const dates = "20270507T043000Z/20270508T183000Z";
    
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;

    // Downloadable .ics file for Apple / Outlook
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//InviteStory//Jessica and Dwij Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@jessica-dwij-wedding`,
      "DTSTAMP:20261103T000000Z",
      "DTSTART:20270507T043000Z",
      "DTEND:20270508T183000Z",
      "SUMMARY:Jessica & Dwij Wedding Celebrations",
      "DESCRIPTION:Wedding celebrations of Jessica & Dwij across May 7 & 8, 2027 in Udaipur.",
      "LOCATION:The Grand Emerald Palace & Royal Pavilions, Udaipur, Rajasthan",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'Jessica-and-Dwij-Wedding.ics';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    // Also open Google Calendar in new tab
    window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
  }

  if (addToCalendarBtn) {
    addToCalendarBtn.addEventListener('click', handleAddToCalendar);
  }
});
