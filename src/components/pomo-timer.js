import { setDurationObservable } from "../utils/observables/set-duration-observable";
import { timerObservable } from "../utils/observables/timer-observable";

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
    timerObservable.subscribe(this.subscribeToTimerEvent.bind(this));
    setDurationObservable.subscribe(this.handleSetWorkDurationEvent.bind(this));
  }
  connectedCallback() {
    this.setUpEventListeners();
  }
  subscribeToTimerEvent(data) {
    switch (data) {
      case "start-timer":
        this.handleStartTimerEvent();
        break;
      case "pause-timer":
        this.handlePauseTimerEvent();
        break;
      default:
        this.handleResetTimerEvent();
        break;
    }
  }

  handleStartTimerEvent = () => {
    console.log("start");
    this.startTimer();
  };

  handlePauseTimerEvent = () => {
    this.pauseTimer();
  };

  handleResetTimerEvent = () => {
    this.resetTimer();
  };
  // Arrow functions in class definitions create new functions for each instance, potentially increasing memory usage.
  handleSetWorkDurationEvent(data) {
    this.workDuration = data.workDuration;
    this.setTime();
    this.updatePomoTimerClock();
    this.clearTimer();
    this.startTimer();
  }
  disconnectedCallback() {
    // this.clearTimer();
    timerObservable.unsubscribe(this.subscribeToTimerEvent.bind(this));
    setDurationObservable.unsubscibe(
      this.handleSetWorkDurationEvent.bind(this)
    );
  }

  setTime() {
    this.timeInSeconds = this.workDuration * 60;
    this.time = this.formatTime(this.timeInSeconds);
  }

  formatTime(duration) {
    const minutes = Math.floor(duration / 60).toString();
    const seconds = (duration % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
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
    } else {
      this.clearTimer();
      this.startTimer();
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
