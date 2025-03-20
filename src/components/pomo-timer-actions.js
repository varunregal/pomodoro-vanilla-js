import { timerObservable } from "../utils/observables/timer-observable";

class PomoTimerActions extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.setUpReferences();
    this.isClockRunning = false;
  }

  setUpReferences() {
    this.startPauseButton = this.querySelector(
      ".pomo-timer-actions__start-or-pause"
    );
    this.resetButton = this.querySelector(".pomo-timer-actions__reset");
  }
  setUpEventListeners() {
    this.startPauseButton.addEventListener(
      "click",
      this.handleStartPauseButtonClick.bind(this)
    );

    this.resetButton.addEventListener(
      "click",
      this.handleResetButtonClick.bind(this)
    );
  }
  connectedCallback() {
    this.setUpEventListeners();
  }
  handleStartPauseButtonClick() {
    if (!this.isClockRunning) this.handleStartClick();
    else this.handlePauseClick();
    this.setIsClockRunning(!this.isClockRunning);
  }
  handleStartClick() {
    timerObservable.broadcast("start-timer");
    this.updateStartPauseText("Pause");
  }

  handlePauseClick() {
    timerObservable.broadcast("pause-timer");
    this.updateStartPauseText("Start");
  }
  handleResetButtonClick() {
    timerObservable.broadcast("reset-timer");
    this.setIsClockRunning(false);
    this.updateStartPauseText("Start");
  }

  disconnectedCallback() {
    this.startPauseButton.removeEventListener(
      "click",
      this.handleStartPauseButtonClick.bind(this)
    );
    this.resetButton.removeEventListener(
      "click",
      this.handleResetButtonClick.bind(this)
    );
  }

  setIsClockRunning(status) {
    this.isClockRunning = status;
  }

  updateStartPauseText(text) {
    this.startPauseButton.textContent = text;
  }

  render() {
    this.innerHTML = `
      <section class="pomo-timer-actions">
        <button class="pomo-timer-actions__start-or-pause">Start</button>
        <button class="pomo-timer-actions__reset">Reset</button>
      </section>
    `;
  }
}

customElements.define("pomo-timer-actions", PomoTimerActions);
