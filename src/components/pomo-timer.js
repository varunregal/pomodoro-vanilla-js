class PomoTimer extends HTMLElement {
  constructor() {
    super();
    this.setUpInstances();
    this.render();
    this.setUpReferences();
  }
  setUpInstances() {
    this.timeIntervalId;
    this.workDuration = 15;
    this.setTime();
  }
  setUpReferences() {
    this.pomoTimerClock = this.querySelector(".pomo-timer__clock");
  }
  setUpEventListeners() {
    document.addEventListener("start-timer", this.handleStartTimerEvent);
    document.addEventListener("pause-timer", this.handlePauseTimerEvent);
    document.addEventListener("reset-timer", this.handleResetTimerEvent);
    document.addEventListener(
      "set-work-duration",
      this.handleSetWorkDurationEvent
    );
  }
  connectedCallback() {
    this.setUpEventListeners();
  }

  handleStartTimerEvent = () => {
    this.startTimer();
  };

  handlePauseTimerEvent = () => {
    this.pauseTimer();
  };

  handleResetTimerEvent = () => {
    this.resetTimer();
  };
  // Arrow functions in class definitions create new functions for each instance, potentially increasing memory usage.
  handleSetWorkDurationEvent = (e) => {
    this.workDuration = e.detail.workDuration;
    this.setTime();
    this.updatePomoTimerClock();
    this.clearTimer();
    this.startTimer();
  };
  disconnectedCallback() {
    // this.clearTimer();
    document.removeEventListener("start-timer", this.handleStartTimerEvent);
    document.removeEventListener("pause-timer", this.handlePauseTimerEvent);
    document.removeEventListener("reset-timer", this.handleResetTimerEvent);
    document.removeEventListener(
      "set-work-duration",
      this.handleSetWorkDurationEvent
    );
  }

  setTime() {
    this.timeInSeconds = this.workDuration * 60;
    this.time = this.formatTime(this.timeInSeconds);
  }

  formatTime(duration) {
    const minutes = Math.floor(duration / 60);
    const subSeconds = duration % 60;

    return (
      minutes.toString() +
      ":" +
      (subSeconds < 10 ? "0" + subSeconds.toString() : subSeconds.toString())
    );
  }

  updatePomoTimerClock() {
    this.pomoTimerClock.textContent = this.time;
  }
  startTimer() {
    if (!this.timeIntervalId) {
      const startTime = Date.now();
      const initialSeconds = this.timeInSeconds;
      this.timeIntervalId = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        this.timeInSeconds = Math.max(0, initialSeconds - elapsedSeconds);
        // handle condition when timer reaches zero
        this.time = this.formatTime(this.timeInSeconds);
        this.updatePomoTimerClock();
      }, 1000);
    }
  }

  pauseTimer() {
    if (this.timeIntervalId) this.clearTimer();
  }

  resetTimer() {
    this.clearTimer();
    this.setTime();
    this.updatePomoTimerClock();
  }

  clearTimer() {
    clearInterval(this.timeIntervalId);
    this.timeIntervalId = undefined;
  }

  render() {
    this.innerHTML = `
      <section class="pomo-timer">
        <div class="pomo-timer__clock">
          ${this.time}
        </div>
      </section>
    `;
  }
}

customElements.define("pomo-timer", PomoTimer);
