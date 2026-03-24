const AuthManager = {
  init() {
    this.authModal = document.getElementById("auth-modal");
    this.authForm = document.getElementById("auth-form");
    this.userGreeting = document.getElementById("user-greeting");
    this.logoutBtn = document.getElementById("logout-btn");
    this.footerDevName = document.getElementById("footer-developer-name");

    this.checkAuth();
    this.authForm.addEventListener("submit", (e) => this.handleLogin(e));
    this.logoutBtn.addEventListener("click", () => this.handleLogout());
  },

  checkAuth() {
    const userData =
      localStorage.getItem("pranayama_user") ||
      sessionStorage.getItem("pranayama_user");
    if (userData) {
      this.showApp(JSON.parse(userData));
    } else {
      this.showAuthModal();
    }
  },

  handleLogin(e) {
    e.preventDefault();
    const name = document.getElementById("user-name").value.trim();
    const rememberMe = document.getElementById("remember-me").checked;

    if (!name) return;

    const userData = { name, loginTime: new Date().toISOString() };
    rememberMe
      ? localStorage.setItem("pranayama_user", JSON.stringify(userData))
      : sessionStorage.setItem("pranayama_user", JSON.stringify(userData));

    this.showApp(userData);
  },

  handleLogout() {
    localStorage.removeItem("pranayama_user");
    sessionStorage.removeItem("pranayama_user");
    location.reload();
  },

  showApp(user) {
    this.authModal.classList.add("hidden");
    this.authModal.style.display = "none"; // Ensure it's gone
    const firstName = user.name.split(" ")[0];
    this.userGreeting.innerHTML = `<span>Hello,</span> ${firstName} 🙏`;
    if (this.footerDevName) this.footerDevName.textContent = user.name;
  },

  showAuthModal() {
    this.authModal.classList.remove("hidden");
    this.authModal.style.display = "flex";
  },
};

// =============================================
// ENHANCED BREATHING TIMER CLASS
// =============================================
class BreathingTimer {
  constructor(element, inhaleTime, holdTime, exhaleTime, maxRounds) {
    this.element = element;
    this.inhaleTime = inhaleTime;
    this.holdTime = holdTime;
    this.exhaleTime = exhaleTime;
    this.maxRounds = maxRounds;

    // UI Elements
    this.section = document.querySelector(`[data-element="${element}"]`);
    this.circle = document.getElementById(`${element}-circle`);
    this.phaseEl = document.getElementById(`${element}-phase`);
    this.countEl = document.getElementById(`${element}-count`);
    this.startBtn = document.getElementById(`${element}-start`);
    this.resetBtn = document.getElementById(`${element}-reset`);
    this.roundsEl = document.getElementById(`${element}-rounds`);

    this.isRunning = false;
    this.currentRound = 0;
    this.currentPhase = "ready";
    this.timer = null;
    this.countdown = 0;

    this.init();
  }

  init() {
    this.startBtn.addEventListener("click", () => this.toggle());
    this.resetBtn.addEventListener("click", () => this.reset());
  }

  toggle() {
    this.isRunning ? this.pause() : this.start();
  }

  start() {
    if (this.currentRound >= this.maxRounds) this.reset();
    this.isRunning = true;
    this.startBtn.textContent = "Pause";
    this.startBtn.classList.add("active-btn");

    // Add "Active" class to the whole card for focus
    this.circle.closest(".timer-card").style.transform = "translateY(-10px)";
    this.circle.closest(".timer-card").style.boxShadow =
      "0 30px 60px rgba(0,0,0,0.1)";

    if (this.currentPhase === "ready" || this.currentPhase === "complete") {
      this.currentRound++;
      this.startInhale();
    } else {
      this.runTimer();
    }
  }

  pause() {
    this.isRunning = false;
    this.startBtn.textContent = "Resume";
    clearInterval(this.timer);
  }

  reset() {
    this.isRunning = false;
    this.currentRound = 0;
    this.currentPhase = "ready";
    this.startBtn.textContent = "Start Practice";
    clearInterval(this.timer);
    this.circle.className = "breath-circle"; // Reset classes
    this.circle.closest(".timer-card").style.transform = "";
    this.updateDisplay();
  }

  startInhale() {
    this.currentPhase = "Inhale";
    this.countdown = this.inhaleTime;
    this.updatePhaseUI("inhale");
    this.runTimer();
  }

  startHold() {
    if (this.holdTime === 0) return this.startExhale();
    this.currentPhase = "Hold";
    this.countdown = this.holdTime;
    this.updatePhaseUI("hold");
    this.runTimer();
  }

  startExhale() {
    this.currentPhase = "Exhale";
    this.countdown = this.exhaleTime;
    this.updatePhaseUI("exhale");
    this.runTimer();
  }

  updatePhaseUI(phaseClass) {
    this.circle.classList.remove("inhale", "hold", "exhale");
    // Small timeout to trigger CSS transition smoothly
    setTimeout(() => this.circle.classList.add(phaseClass), 10);
  }

  runTimer() {
    this.updateDisplay();
    this.timer = setInterval(() => {
      this.countdown--;
      this.updateDisplay();

      if (this.countdown <= 0) {
        clearInterval(this.timer);
        if (this.currentPhase === "Inhale") this.startHold();
        else if (this.currentPhase === "Hold") this.startExhale();
        else if (this.currentPhase === "Exhale") {
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

  updateDisplay() {
    this.phaseEl.textContent = this.currentPhase;
    this.countEl.textContent =
      this.countdown || (this.currentPhase === "ready" ? "0" : "");
    this.roundsEl.textContent = `${this.currentRound} / ${this.maxRounds}`;
  }

  complete() {
    this.isRunning = false;
    this.currentPhase = "Done";
    this.updateDisplay();
    this.countEl.textContent = "🙏";
    this.circle.classList.remove("inhale", "hold", "exhale");
    this.startBtn.textContent = "Restart";

    const zenTips = [
      "Softness is the greatest strength. Carry this breath with you.",
      "You have created space within yourself. Notice the stillness.",
      "Your mind is like the sky; thoughts are just clouds. The sky remains.",
    ];

    const randomTip = zenTips[Math.floor(Math.random() * zenTips.length)];
    this.phaseEl.innerHTML = `<span style="font-size: 0.8rem; text-transform: none;">${randomTip}</span>`;
  }
}

// =============================================
// KAPALBHATI TIMER (FIRE)
// =============================================
class KapalbhatiTimer extends BreathingTimer {
  constructor(element, breathsPerRound, maxRounds) {
    super(element, 0, 0, 0, maxRounds);
    this.breathsPerRound = breathsPerRound;
    this.currentBreath = 0;
  }

  runTimer() {
    this.currentPhase = "Breathe";
    this.timer = setInterval(() => {
      this.circle.classList.toggle("inhale");
      this.circle.classList.toggle("exhale");

      if (this.circle.classList.contains("inhale")) {
        this.currentBreath++;
        this.updateDisplay();
      }

      if (this.currentBreath >= this.breathsPerRound) {
        clearInterval(this.timer);
        this.handleRest();
      }
    }, 400); // Fast cycle for Kapalbhati
  }

  handleRest() {
    this.currentBreath = 0;
    this.currentPhase = "Rest";
    this.updateDisplay();
    setTimeout(() => {
      if (this.isRunning && this.currentRound < this.maxRounds) {
        this.currentRound++;
        this.runTimer();
      } else if (this.currentRound >= this.maxRounds) {
        this.complete();
      }
    }, 3000);
  }

  updateDisplay() {
    this.phaseEl.textContent = this.currentPhase;
    this.countEl.textContent = this.currentBreath || "";
    this.roundsEl.textContent = `${this.currentRound} / ${this.maxRounds}`;
  }
}

// =============================================
// INITIALIZATION
// =============================================

// Timers
const earthTimer = new BreathingTimer("earth", 4, 0, 6, 10);
const waterTimer = new BreathingTimer("water", 5, 3, 5, 12);
const fireTimer = new KapalbhatiTimer("fire", 30, 5);
const airTimer = new BreathingTimer("air", 4, 4, 4, 15);
const etherTimer = new BreathingTimer("ether", 5, 2, 5, 20);

// App Boot
window.addEventListener("DOMContentLoaded", () => {
  AuthManager.init();

  // Intersection Observer for Nav Highlighting
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("data-section") === entry.target.id,
            );
          });
        }
      });
    },
    { threshold: 0.5 },
  );

  document.querySelectorAll(".section").forEach((s) => observer.observe(s));
});

// Keyboard Shortcut: Space to Start/Pause
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && e.target.tagName !== "INPUT") {
    e.preventDefault();
    const activeSection = [...document.querySelectorAll(".section")].find(
      (s) =>
        s.getBoundingClientRect().top >= -200 &&
        s.getBoundingClientRect().top <= 400,
    );
    if (activeSection) {
      const btn = activeSection.querySelector(".btn-primary");
      if (btn) btn.click();
    }
  }
});
