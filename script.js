// ==========================================================================
// Ambient Starry Night Background
// ==========================================================================
function createStars() {
    const container = document.getElementById('starsContainer');
    if (!container) return;
    const starCount = 65;

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
// Web Audio API - Synthesized Happy Birthday Music Box
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

    playTone(freq, time, duration = 0.35) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Music box / celesta timbre (sine + harmonics)
        osc.type = 'sine';
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

        // Notes for Happy Birthday in C major
        // G4, G4, A4, G4, C5, B4
        // G4, G4, A4, G4, D5, C5
        // G4, G4, G5, E5, C5, B4, A4
        // F5, F5, E5, C5, D5, C5
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

    playChimePop() {
        this.init();
        const note = 523.25 + Math.random() * 400;
        this.playTone(note, this.ctx.currentTime, 0.2);
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

    // Center burst
    confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff7ebb', '#9d7bff', '#ffd166', '#38bdf8', '#ffffff']
    });

    // Side cannons
    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff7ebb', '#ffd166', '#a855f7']
        });
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#38bdf8', '#ec4899', '#ffd166']
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
            cakeHint.textContent = "🎉 Wish Granted! May all your hopes come true! 💫";
            cakeHint.style.color = "#ff7ebb";
            isExtinguished = true;

            // Trigger celebration
            launchFullConfetti();
            synth.playChimePop();

            // Auto-relight after 8 seconds so user can enjoy again
            setTimeout(() => {
                candleFlame.classList.remove('extinguished');
                cakeHint.textContent = "✨ Tap the candle to make a wish & blow it out! ✨";
                cakeHint.style.color = "var(--accent)";
                isExtinguished = false;
            }, 8000);
        }
    });
}

// ==========================================================================
// Floating Balloons Spawner
// ==========================================================================
function spawnBalloons() {
    const area = document.getElementById('balloonArea');
    if (!area) return;

    const balloonEmojis = ['🎈', '✨', '💖', '🎂', '🌸', '🎁', '⭐', '🎈'];
    const colors = [
        'radial-gradient(circle at 35% 35%, #ff9ac9, #db2777)',
        'radial-gradient(circle at 35% 35%, #c084fc, #7e22ce)',
        'radial-gradient(circle at 35% 35%, #93c5fd, #2563eb)',
        'radial-gradient(circle at 35% 35%, #fde047, #ca8a04)',
        'radial-gradient(circle at 35% 35%, #86efac, #16a34a)'
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
            synth.playChimePop();
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

    // 6. Sound Toggle Button
    const soundToggle = document.getElementById('soundToggle');
    const soundIcon = document.getElementById('soundIcon');
    const btnText = soundToggle.querySelector('.btn-text');

    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            if (synth.isPlaying) {
                synth.stop();
                soundToggle.classList.remove('playing');
                soundIcon.textContent = '🎵';
                btnText.textContent = 'Play Birthday Tune';
            } else {
                soundToggle.classList.add('playing');
                soundIcon.textContent = '⏸️';
                btnText.textContent = 'Playing Tune...';

                synth.playBirthdayTune(() => {
                    soundToggle.classList.remove('playing');
                    soundIcon.textContent = '🎵';
                    btnText.textContent = 'Play Birthday Tune';
                });
            }
        });
    }
});
