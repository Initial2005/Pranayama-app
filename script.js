// =============================================
// AUTHENTICATION SYSTEM
// =============================================
const AuthManager = {
    init() {
        this.authModal = document.getElementById('auth-modal');
        this.authForm = document.getElementById('auth-form');
        this.userGreeting = document.getElementById('user-greeting');
        this.logoutBtn = document.getElementById('logout-btn');
        this.footerDevName = document.getElementById('footer-developer-name');
        
        // Check if user is already logged in
        this.checkAuth();
        
        // Event listeners
        this.authForm.addEventListener('submit', (e) => this.handleLogin(e));
        this.logoutBtn.addEventListener('click', () => this.handleLogout());
    },
    
    checkAuth() {
        const userData = localStorage.getItem('pranayama_user');
        
        if (userData) {
            try {
                const user = JSON.parse(userData);
                this.showApp(user);
            } catch (e) {
                this.showAuthModal();
            }
        } else {
            this.showAuthModal();
        }
    },
    
    handleLogin(e) {
        e.preventDefault();
        
        const name = document.getElementById('user-name').value.trim();
        const email = document.getElementById('user-email').value.trim();
        const rememberMe = document.getElementById('remember-me').checked;
        
        if (!name) {
            alert('Please enter your name');
            return;
        }
        
        const userData = {
            name: name,
            email: email || '',
            loginTime: new Date().toISOString(),
            rememberMe: rememberMe
        };
        
        // Store user data if remember me is checked
        if (rememberMe) {
            localStorage.setItem('pranayama_user', JSON.stringify(userData));
        } else {
            sessionStorage.setItem('pranayama_user', JSON.stringify(userData));
        }
        
        this.showApp(userData);
    },
    
    handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('pranayama_user');
            sessionStorage.removeItem('pranayama_user');
            location.reload();
        }
    },
    
    showApp(user) {
        // Hide auth modal
        this.authModal.classList.add('hidden');
        
        // Update user greeting
        const firstName = user.name.split(' ')[0];
        this.userGreeting.textContent = `Welcome, ${firstName}! 🙏`;
        
        // Update footer
        if (this.footerDevName) {
            this.footerDevName.textContent = user.name;
        }
        
        // Show nav user section
        document.querySelector('.nav-user').style.display = 'flex';
    },
    
    showAuthModal() {
        this.authModal.classList.remove('hidden');
        document.querySelector('.nav-user').style.display = 'none';
    }
};

// =============================================
// CONTACT FORM HANDLER
// =============================================
const ContactManager = {
    init() {
        this.contactForm = document.getElementById('contact-form');
        this.formStatus = document.getElementById('form-status');
        
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    },
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('contact-name').value.trim(),
            email: document.getElementById('contact-email').value.trim(),
            subject: document.getElementById('contact-subject').value.trim(),
            message: document.getElementById('contact-message').value.trim(),
            timestamp: new Date().toISOString()
        };
        
        // Validate
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            this.showStatus('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            this.showStatus('Please enter a valid email address', 'error');
            return;
        }
        
        // Store in localStorage as a simple solution
        this.saveMessage(formData);
        
        // Show success message
        this.showStatus('✓ Thank you! Your message has been received. I\'ll get back to you soon!', 'success');
        
        // Reset form
        this.contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            this.formStatus.style.display = 'none';
        }, 5000);
    },
    
    saveMessage(data) {
        // Get existing messages
        let messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
        messages.push(data);
        localStorage.setItem('contact_messages', JSON.stringify(messages));
    },
    
    showStatus(message, type) {
        this.formStatus.textContent = message;
        this.formStatus.className = 'form-status ' + type;
    }
};

// =============================================
// NAVIGATION ACTIVE STATE
// =============================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// Update active nav link on scroll
const observerOptions = {
    threshold: 0.6
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// =============================================
// BREATHING TIMER CLASS
// =============================================
class BreathingTimer {
    constructor(element, inhaleTime, holdTime, exhaleTime, maxRounds) {
        this.element = element;
        this.inhaleTime = inhaleTime;
        this.holdTime = holdTime;
        this.exhaleTime = exhaleTime;
        this.maxRounds = maxRounds;
        
        this.circle = document.getElementById(`${element}-circle`);
        this.phaseEl = document.getElementById(`${element}-phase`);
        this.countEl = document.getElementById(`${element}-count`);
        this.startBtn = document.getElementById(`${element}-start`);
        this.resetBtn = document.getElementById(`${element}-reset`);
        this.roundsEl = document.getElementById(`${element}-rounds`);
        
        this.isRunning = false;
        this.currentRound = 0;
        this.currentPhase = 'ready';
        this.timer = null;
        this.countdown = 0;
        
        this.init();
    }
    
    init() {
        this.startBtn.addEventListener('click', () => this.toggle());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.updateDisplay();
    }
    
    toggle() {
        if (this.isRunning) {
            this.pause();
        } else {
            this.start();
        }
    }
    
    start() {
        if (this.currentRound >= this.maxRounds) {
            this.reset();
        }
        
        this.isRunning = true;
        this.startBtn.textContent = 'Pause';
        
        if (this.currentPhase === 'ready' || this.currentPhase === 'complete') {
            this.currentRound++;
            this.startInhale();
        } else {
            this.resume();
        }
    }
    
    pause() {
        this.isRunning = false;
        this.startBtn.textContent = 'Resume';
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    
    resume() {
        this.isRunning = true;
        this.startBtn.textContent = 'Pause';
        this.runTimer();
    }
    
    reset() {
        this.isRunning = false;
        this.currentRound = 0;
        this.currentPhase = 'ready';
        this.countdown = 0;
        this.startBtn.textContent = 'Start Practice';
        
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.circle.classList.remove('inhale', 'hold', 'exhale');
        this.updateDisplay();
    }
    
    startInhale() {
        this.currentPhase = 'inhale';
        this.countdown = this.inhaleTime;
        this.circle.classList.remove('hold', 'exhale');
        this.circle.classList.add('inhale');
        this.runTimer();
    }
    
    startHold() {
        if (this.holdTime === 0) {
            this.startExhale();
            return;
        }
        
        this.currentPhase = 'hold';
        this.countdown = this.holdTime;
        this.circle.classList.remove('inhale', 'exhale');
        this.circle.classList.add('hold');
        this.runTimer();
    }
    
    startExhale() {
        this.currentPhase = 'exhale';
        this.countdown = this.exhaleTime;
        this.circle.classList.remove('inhale', 'hold');
        this.circle.classList.add('exhale');
        this.runTimer();
    }
    
    runTimer() {
        this.updateDisplay();
        
        this.timer = setInterval(() => {
            this.countdown--;
            this.updateDisplay();
            
            if (this.countdown <= 0) {
                clearInterval(this.timer);
                
                if (this.currentPhase === 'inhale') {
                    this.startHold();
                } else if (this.currentPhase === 'hold') {
                    this.startExhale();
                } else if (this.currentPhase === 'exhale') {
                    if (this.currentRound < this.maxRounds) {
                        this.currentRound++;
                        this.startInhale();
                    } else {
                        this.complete();
                    }
                }
            }
        }, 1000);
    }
    
    complete() {
        this.isRunning = false;
        this.currentPhase = 'complete';
        this.circle.classList.remove('inhale', 'hold', 'exhale');
        this.phaseEl.textContent = 'Complete!';
        this.countEl.textContent = '✓';
        this.startBtn.textContent = 'Start Again';
        this.updateRounds();
        
        // Celebration animation
        this.celebrate();
    }
    
    celebrate() {
        let pulseCount = 0;
        const pulseInterval = setInterval(() => {
            if (pulseCount % 2 === 0) {
                this.circle.style.transform = 'scale(1.1)';
            } else {
                this.circle.style.transform = 'scale(1)';
            }
            pulseCount++;
            
            if (pulseCount >= 6) {
                clearInterval(pulseInterval);
                this.circle.style.transform = '';
            }
        }, 200);
    }
    
    updateDisplay() {
        if (this.currentPhase === 'ready') {
            this.phaseEl.textContent = 'Ready';
            this.countEl.textContent = '0';
        } else if (this.currentPhase === 'complete') {
            this.phaseEl.textContent = 'Complete!';
            this.countEl.textContent = '✓';
        } else {
            this.phaseEl.textContent = this.currentPhase;
            this.countEl.textContent = this.countdown;
        }
        
        this.updateRounds();
    }
    
    updateRounds() {
        this.roundsEl.textContent = `${this.currentRound} / ${this.maxRounds}`;
    }
}

// =============================================
// KAPALBHATI TIMER (FIRE - RAPID BREATHING)
// =============================================
class KapalbhatiTimer {
    constructor(element, breathsPerRound, maxRounds) {
        this.element = element;
        this.breathsPerRound = breathsPerRound;
        this.maxRounds = maxRounds;
        
        this.circle = document.getElementById(`${element}-circle`);
        this.phaseEl = document.getElementById(`${element}-phase`);
        this.countEl = document.getElementById(`${element}-count`);
        this.startBtn = document.getElementById(`${element}-start`);
        this.resetBtn = document.getElementById(`${element}-reset`);
        this.roundsEl = document.getElementById(`${element}-rounds`);
        
        this.isRunning = false;
        this.currentRound = 0;
        this.currentBreath = 0;
        this.timer = null;
        this.isInhaling = true;
        
        this.init();
    }
    
    init() {
        this.startBtn.addEventListener('click', () => this.toggle());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.updateDisplay();
    }
    
    toggle() {
        if (this.isRunning) {
            this.pause();
        } else {
            this.start();
        }
    }
    
    start() {
        if (this.currentRound >= this.maxRounds) {
            this.reset();
        }
        
        this.isRunning = true;
        this.startBtn.textContent = 'Pause';
        
        if (this.currentBreath === 0) {
            this.currentRound++;
        }
        
        this.runTimer();
    }
    
    pause() {
        this.isRunning = false;
        this.startBtn.textContent = 'Resume';
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    
    reset() {
        this.isRunning = false;
        this.currentRound = 0;
        this.currentBreath = 0;
        this.startBtn.textContent = 'Start Practice';
        
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.circle.classList.remove('inhale', 'exhale');
        this.updateDisplay();
    }
    
    runTimer() {
        this.updateDisplay();
        
        // Rapid breathing: 0.5 seconds per breath cycle
        this.timer = setInterval(() => {
            this.isInhaling = !this.isInhaling;
            
            if (this.isInhaling) {
                this.circle.classList.remove('exhale');
                this.circle.classList.add('inhale');
                this.currentBreath++;
                this.updateDisplay();
                
                if (this.currentBreath >= this.breathsPerRound) {
                    clearInterval(this.timer);
                    this.endRound();
                }
            } else {
                this.circle.classList.remove('inhale');
                this.circle.classList.add('exhale');
            }
        }, 500);
    }
    
    endRound() {
        this.currentBreath = 0;
        this.circle.classList.remove('inhale', 'exhale');
        
        if (this.currentRound < this.maxRounds) {
            this.phaseEl.textContent = 'Rest';
            this.countEl.textContent = '5';
            
            // 5 second rest between rounds
            let restCount = 5;
            const restTimer = setInterval(() => {
                restCount--;
                this.countEl.textContent = restCount;
                
                if (restCount <= 0) {
                    clearInterval(restTimer);
                    if (this.isRunning) {
                        this.currentRound++;
                        this.runTimer();
                    }
                }
            }, 1000);
        } else {
            this.complete();
        }
    }
    
    complete() {
        this.isRunning = false;
        this.circle.classList.remove('inhale', 'exhale');
        this.phaseEl.textContent = 'Complete!';
        this.countEl.textContent = '✓';
        this.startBtn.textContent = 'Start Again';
        this.updateRounds();
        this.celebrate();
    }
    
    celebrate() {
        let pulseCount = 0;
        const pulseInterval = setInterval(() => {
            if (pulseCount % 2 === 0) {
                this.circle.style.transform = 'scale(1.1)';
            } else {
                this.circle.style.transform = 'scale(1)';
            }
            pulseCount++;
            
            if (pulseCount >= 6) {
                clearInterval(pulseInterval);
                this.circle.style.transform = '';
            }
        }, 200);
    }
    
    updateDisplay() {
        if (this.currentBreath === 0 && this.currentRound === 0) {
            this.phaseEl.textContent = 'Ready';
            this.countEl.textContent = '0';
        } else if (this.isRunning) {
            this.phaseEl.textContent = 'Breathe';
            this.countEl.textContent = this.currentBreath;
        }
        
        this.updateRounds();
    }
    
    updateRounds() {
        this.roundsEl.textContent = `${this.currentRound} / ${this.maxRounds}`;
    }
}

// =============================================
// INITIALIZE ALL TIMERS
// =============================================

// Earth - Bhramari (Humming Bee Breath)
const earthTimer = new BreathingTimer('earth', 4, 0, 6, 10);

// Water - Sheetali (Cooling Breath)
const waterTimer = new BreathingTimer('water', 5, 3, 5, 12);

// Fire - Kapalbhati (Skull Shining Breath - Rapid)
const fireTimer = new KapalbhatiTimer('fire', 30, 5);

// Air - Nadi Shodhana (Alternate Nostril)
const airTimer = new BreathingTimer('air', 4, 4, 4, 15);

// Ether - Ujjayi (Ocean Breath)
const etherTimer = new BreathingTimer('ether', 5, 2, 5, 20);

// =============================================
// SMOOTH SCROLL ENHANCEMENTS
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =============================================
// PAGE LOAD ANIMATIONS & INITIALIZATION
// =============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize authentication system
    AuthManager.init();
    
    // Initialize contact form
    ContactManager.init();
});

// =============================================
// KEYBOARD SHORTCUTS
// =============================================
document.addEventListener('keydown', (e) => {
    // Don't trigger shortcuts if typing in form
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    
    // Space bar to start/pause current visible timer
    if (e.code === 'Space') {
        e.preventDefault();
        
        const visibleSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top < window.innerHeight / 2;
        });
        
        if (visibleSection && visibleSection.id !== 'hero' && visibleSection.id !== 'about' && visibleSection.id !== 'contact') {
            const startBtn = visibleSection.querySelector('.btn-primary');
            if (startBtn) startBtn.click();
        }
    }
    
    // R key to reset current visible timer
    if (e.code === 'KeyR') {
        const visibleSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top < window.innerHeight / 2;
        });
        
        if (visibleSection && visibleSection.id !== 'hero' && visibleSection.id !== 'about' && visibleSection.id !== 'contact') {
            const resetBtn = visibleSection.querySelector('.btn-secondary');
            if (resetBtn) resetBtn.click();
        }
    }
});

console.log('🧘 Pranayama App Loaded Successfully');
console.log('💡 Features:');
console.log('   ✓ Authentication with auto-login');
console.log('   ✓ Interactive breathing timers');
console.log('   ✓ Developer info & contact form');
console.log('   ✓ Keyboard shortcuts (Space, R)');
console.log('   ✓ Responsive design');