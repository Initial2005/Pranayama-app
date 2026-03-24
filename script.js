// Replace your entire script.js with this
const AuthManager = {
    init() {
        this.authModal = document.getElementById('auth-modal');
        this.authForm = document.getElementById('auth-form');
        this.userGreeting = document.getElementById('user-greeting');
        this.logoutBtn = document.getElementById('logout-btn');
        
        this.checkAuth();
        this.authForm.addEventListener('submit', (e) => this.handleLogin(e));
        this.logoutBtn.addEventListener('click', () => this.handleLogout());
    },
    
    checkAuth() {
        const userData = localStorage.getItem('pranayama_user');
        if (userData) {
            this.showApp(JSON.parse(userData));
        }
    },
    
    handleLogin(e) {
        e.preventDefault();
        const name = document.getElementById('user-name').value;
        if (!name) return;
        const userData = { name };
        localStorage.setItem('pranayama_user', JSON.stringify(userData));
        this.showApp(userData);
    },
    
    handleLogout() {
        localStorage.removeItem('pranayama_user');
        location.reload();
    },
    
    showApp(user) {
        this.authModal.classList.add('hidden');
        this.userGreeting.textContent = `Welcome, ${user.name.split(' ')[0]} 🙏`;
    }
};

class BreathingTimer {
    constructor(element, inhaleTime, holdTime, exhaleTime, maxRounds) {
        this.circle = document.getElementById(`${element}-circle`);
        this.phaseEl = document.getElementById(`${element}-phase`);
        this.countEl = document.getElementById(`${element}-count`);
        this.startBtn = document.getElementById(`${element}-start`);
        this.resetBtn = document.getElementById(`${element}-reset`);
        this.roundsEl = document.getElementById(`${element}-rounds`);
        
        this.inhaleTime = inhaleTime;
        this.holdTime = holdTime;
        this.exhaleTime = exhaleTime;
        this.maxRounds = maxRounds;
        
        this.isRunning = false;
        this.currentRound = 0;
        this.timer = null;
        this.init();
    }

    init() {
        this.startBtn.addEventListener('click', () => this.toggle());
        this.resetBtn.addEventListener('click', () => this.reset());
    }

    toggle() {
        if (this.isRunning) {
            clearInterval(this.timer);
            this.isRunning = false;
            this.startBtn.textContent = "Resume";
        } else {
            this.isRunning = true;
            this.startBtn.textContent = "Pause";
            this.startCycle();
        }
    }

    startCycle() {
        if (this.currentRound >= this.maxRounds) return this.complete();
        this.currentRound++;
        this.updateRounds();
        this.inhale();
    }

    inhale() {
        this.updateUI("Inhale", this.inhaleTime, "inhale");
        this.startTimer(this.inhaleTime, () => this.hold());
    }

    hold() {
        this.updateUI("Hold", this.holdTime, "hold");
        this.startTimer(this.holdTime, () => this.exhale());
    }

    exhale() {
        this.updateUI("Exhale", this.exhaleTime, "exhale");
        this.startTimer(this.exhaleTime, () => this.startCycle());
    }

    startTimer(seconds, callback) {
        let remaining = seconds;
        this.countEl.textContent = remaining;
        this.timer = setInterval(() => {
            remaining--;
            this.countEl.textContent = remaining;
            if (remaining <= 0) {
                clearInterval(this.timer);
                callback();
            }
        }, 1000);
    }

    updateUI(phase, count, className) {
        this.phaseEl.textContent = phase;
        this.countEl.textContent = count;
        this.circle.className = `breath-circle ${className}`;
    }

    updateRounds() {
        this.roundsEl.textContent = `${this.currentRound} / ${this.maxRounds}`;
    }

    reset() {
        clearInterval(this.timer);
        this.isRunning = false;
        this.currentRound = 0;
        this.startBtn.textContent = "Start Practice";
        this.updateUI("Ready", 0, "");
        this.updateRounds();
    }

    complete() {
        this.updateUI("Done 🙏", "✓", "");
        this.isRunning = false;
        this.startBtn.textContent = "Restart";
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    AuthManager.init();
    new BreathingTimer('earth', 4, 0, 6, 10);
    new BreathingTimer('water', 5, 3, 5, 12);
    new BreathingTimer('air', 4, 4, 4, 15);
    new BreathingTimer('ether', 5, 2, 5, 20);
});
