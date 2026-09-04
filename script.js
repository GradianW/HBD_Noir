// ==========================================================================
// Ambient Starry Night Background
// ==========================================================================
function createStars() {
    const container = document.getElementById('starsContainer');
    if (!container) return;
    const starCount = 70;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 2.5 + 1;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 3;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${top}vh`;
        star.style.left = `${left}vw`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.animationDelay = `${delay}s`;

        container.appendChild(star);
    }
}

// ==========================================================================
// Web Audio API - Synthesized Happy Birthday & Level Up Sounds
// ==========================================================================
class BirthdayAudioSynthesizer {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.timeoutIds = [];
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playTone(freq, time, duration = 0.35, type = 'sine') {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, time);

        // Envelope
        gain.gain.setValueAtTime(0.001, time);
        gain.gain.exponentialRampToValueAtTime(0.18, time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + duration);
    }

    playBirthdayTune(onComplete) {
        this.init();
        this.stop();
        this.isPlaying = true;

        const notes = [
            { f: 392.00, d: 0.35, gap: 0.4 }, // Hap-
            { f: 392.00, d: 0.35, gap: 0.4 }, // py
            { f: 440.00, d: 0.65, gap: 0.7 }, // birth-
            { f: 392.00, d: 0.65, gap: 0.7 }, // day
            { f: 523.25, d: 0.65, gap: 0.7 }, // to
            { f: 493.88, d: 1.10, gap: 1.2 }, // you

            { f: 392.00, d: 0.35, gap: 0.4 }, // Hap-
            { f: 392.00, d: 0.35, gap: 0.4 }, // py
            { f: 440.00, d: 0.65, gap: 0.7 }, // birth-
            { f: 392.00, d: 0.65, gap: 0.7 }, // day
            { f: 587.33, d: 0.65, gap: 0.7 }, // to
            { f: 523.25, d: 1.10, gap: 1.2 }, // you

            { f: 392.00, d: 0.35, gap: 0.4 }, // Hap-
            { f: 392.00, d: 0.35, gap: 0.4 }, // py
            { f: 783.99, d: 0.65, gap: 0.7 }, // dear
            { f: 659.25, d: 0.65, gap: 0.7 }, // In-
            { f: 523.25, d: 0.65, gap: 0.7 }, // dri
            { f: 493.88, d: 0.65, gap: 0.7 },
            { f: 440.00, d: 1.10, gap: 1.1 },

            { f: 698.46, d: 0.35, gap: 0.4 }, // Hap-
            { f: 698.46, d: 0.35, gap: 0.4 }, // py
            { f: 659.25, d: 0.65, gap: 0.7 }, // birth-
            { f: 523.25, d: 0.65, gap: 0.7 }, // day
            { f: 587.33, d: 0.85, gap: 0.9 }, // to
            { f: 523.25, d: 1.40, gap: 1.5 }  // you!
        ];

        let currentTime = this.ctx.currentTime + 0.1;
        let totalDurationMs = 100;

        notes.forEach(note => {
            this.playTone(note.f, currentTime, note.d);
            currentTime += note.gap;
            totalDurationMs += note.gap * 1000;
        });

        const timerId = setTimeout(() => {
            this.isPlaying = false;
            if (onComplete) onComplete();
        }, totalDurationMs);

        this.timeoutIds.push(timerId);
    }

    // Gaming Level Up Chime
    playLevelUpSound() {
        this.init();
        const t = this.ctx.currentTime;
        this.playTone(523.25, t + 0.00, 0.12, 'triangle'); // C5
        this.playTone(659.25, t + 0.08, 0.12, 'triangle'); // E5
        this.playTone(783.99, t + 0.16, 0.12, 'triangle'); // G5
        this.playTone(1046.50, t + 0.24, 0.35, 'triangle'); // C6
    }

    playChimePop() {
        this.init();
        const note = 580 + Math.random() * 350;
        this.playTone(note, this.ctx.currentTime, 0.18, 'sine');
    }

    stop() {
        this.timeoutIds.forEach(id => clearTimeout(id));
        this.timeoutIds = [];
        this.isPlaying = false;
    }
}

const synth = new BirthdayAudioSynthesizer();

// ==========================================================================
// Confetti Animation Helper
// ==========================================================================
function launchFullConfetti() {
    if (typeof confetti !== 'function') return;

    // Center burst with cyan & gaming colors
    confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00e5ff', '#a855f7', '#ffd166', '#ff334b', '#00e676', '#ffffff']
    });

    // Side cannons
    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#00e5ff', '#ffd166', '#a855f7']
        });
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#38bdf8', '#ff334b', '#00e676']
        });
    }, 250);
}

// ==========================================================================
// Interactive Cake & Candle
// ==========================================================================
function setupCakeInteraction() {
    const cakeElement = document.getElementById('cakeElement');
    const candleFlame = document.getElementById('candleFlame');
    const cakeHint = document.getElementById('cakeHint');
    let isExtinguished = false;

    cakeElement.addEventListener('click', () => {
        if (!isExtinguished) {
            candleFlame.classList.add('extinguished');
            cakeHint.textContent = "🏆 LEVEL UP! Buff Applied: +99999 Longevity & Happiness! ⚡";
            cakeHint.style.color = "#00e5ff";
            isExtinguished = true;

            // Trigger level up sound & celebration
            launchFullConfetti();
            synth.playLevelUpSound();

            // Auto-relight after 8 seconds
            setTimeout(() => {
                candleFlame.classList.remove('extinguished');
                cakeHint.textContent = "✨ Tap the candle to make a wish & claim your Level Up buff! ✨";
                cakeHint.style.color = "var(--accent)";
                isExtinguished = false;
            }, 8000);
        }
    });
}

// ==========================================================================
// Floating Balloons Spawner (Roblox themed)
// ==========================================================================
function spawnBalloons() {
    const area = document.getElementById('balloonArea');
    if (!area) return;

    const balloonEmojis = ['🎈', '🎮', '💎', '🏆', '🎂', '⭐', '🍀', '✨', '⚡', '🎈'];
    const colors = [
        'radial-gradient(circle at 35% 35%, #38bdf8, #0284c7)',
        'radial-gradient(circle at 35% 35%, #c084fc, #7e22ce)',
        'radial-gradient(circle at 35% 35%, #4ade80, #15803d)',
        'radial-gradient(circle at 35% 35%, #fde047, #ca8a04)',
        'radial-gradient(circle at 35% 35%, #f87171, #dc2626)'
    ];

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.classList.add('floating-balloon');
            
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomEmoji = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
            const randomLeft = Math.random() * 85 + 5;
            const speed = Math.random() * 3 + 4.5;

            balloon.style.background = randomColor;
            balloon.style.left = `${randomLeft}vw`;
            balloon.style.setProperty('--speed', `${speed}s`);
            balloon.textContent = randomEmoji;

            // Click to pop
            balloon.addEventListener('click', () => {
                synth.playChimePop();
                confetti({
                    particleCount: 15,
                    startVelocity: 18,
                    spread: 360,
                    origin: {
                        x: balloon.getBoundingClientRect().left / window.innerWidth,
                        y: balloon.getBoundingClientRect().top / window.innerHeight
                    }
                });
                balloon.remove();
            });

            area.appendChild(balloon);

            // Clean up after animation
            setTimeout(() => {
                if (balloon.parentNode) {
                    balloon.remove();
                }
            }, speed * 1000);
        }, i * 280);
    }
}

// ==========================================================================
// Event Listeners Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Generate stars
    createStars();

    // 2. Initial celebration burst
    setTimeout(() => {
        launchFullConfetti();
    }, 600);

    // 3. Cake Interaction
    setupCakeInteraction();

    // 4. Confetti Button
    const celebrateBtn = document.getElementById('celebrateBtn');
    if (celebrateBtn) {
        celebrateBtn.addEventListener('click', () => {
            launchFullConfetti();
            synth.playLevelUpSound();
        });
    }

    // 5. Balloon Button
    const giftWishBtn = document.getElementById('giftWishBtn');
    if (giftWishBtn) {
        giftWishBtn.addEventListener('click', () => {
            spawnBalloons();
            synth.playChimePop();
        });
    }

    // 6. MP3 Background Music Autoplay & Toggle
    const bgMusic = document.getElementById('bgMusic');
    const soundToggle = document.getElementById('soundToggle');
    const soundIcon = document.getElementById('soundIcon');
    const btnText = soundToggle ? soundToggle.querySelector('.btn-text') : null;

    function updatePlayState(isPlaying) {
        if (!soundToggle || !soundIcon || !btnText) return;
        if (isPlaying) {
            soundToggle.classList.add('playing');
            soundIcon.textContent = '🎵';
            btnText.textContent = 'Pause Music';
        } else {
            soundToggle.classList.remove('playing');
            soundIcon.textContent = '🔇';
            btnText.textContent = 'Play Music';
        }
    }

    function tryPlayAudio() {
        if (!bgMusic) return;
        bgMusic.volume = 0.65;
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                updatePlayState(true);
            }).catch(() => {
                // Autoplay blocked by browser policy; wait for first interaction
                updatePlayState(false);
                const startOnInteraction = () => {
                    bgMusic.play().then(() => {
                        updatePlayState(true);
                    }).catch(() => {});
                    window.removeEventListener('click', startOnInteraction);
                    window.removeEventListener('touchstart', startOnInteraction);
                    window.removeEventListener('keydown', startOnInteraction);
                };
                window.addEventListener('click', startOnInteraction, { once: true });
                window.addEventListener('touchstart', startOnInteraction, { once: true });
                window.addEventListener('keydown', startOnInteraction, { once: true });
            });
        }
    }

    // Try playing immediately
    tryPlayAudio();

    if (soundToggle && bgMusic) {
        soundToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    updatePlayState(true);
                });
            } else {
                bgMusic.pause();
                updatePlayState(false);
            }
        });
    }
});
