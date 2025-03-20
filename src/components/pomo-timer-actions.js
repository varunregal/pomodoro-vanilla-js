import { setDurationObservable } from "../utils/observables/set-duration-observable";
import { timerObservable } from "../utils/observables/timer-observable";

// add local state here
class PomoTimerActions extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.setUpReferences();
    this.setUpInstances();
  }
  setUpInstances() {
    this.isClockRunning = false;
  }

  setUpReferences() {
    this.startPauseButton = this.querySelector(".start-or-pause");
    this.resetButton = this.querySelector(".reset");
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
    setDurationObservable.subscribe(this.handleResetButtonClick.bind(this));
  }

  connectedCallback() {
    this.setUpEventListeners();
  }

  handleStartPauseButtonClick() {
    if (!this.isClockRunning) this.handleStartClick();
    else this.handlePauseClick();
  }

  handleStartClick() {
    timerObservable.broadcast("start-timer");
    this.updateStartPauseText("Pause");
    this.setIsClockRunning(true);
  }

  handlePauseClick() {
    timerObservable.broadcast("pause-timer");
    this.updateStartPauseText("Start");
    this.setIsClockRunning(false);
  }
  handleResetButtonClick() {
    timerObservable.broadcast("reset-timer");
    this.setIsClockRunning(false);
    this.updateStartPauseText("Start");
  }

  disconnectedCallback() {
    this.startPauseButton.removeEventListener(
      "click",
      this.handleStartPauseButtonClick
    );
    this.resetButton.removeEventListener("click", this.handleResetButtonClick);
    setDurationObservable.unsubscribe(this.handleResetButtonClick);
  }

  setIsClockRunning(status) {
    this.isClockRunning = status;
  }

  updateStartPauseText(text) {
    this.startPauseButton.textContent = text;
  }

  render() {
    this.innerHTML = `
      <section class="flex gap-4 justify-center">
        <button class="start-or-pause btn btn-primary">Start</button>
        <button class="reset btn btn-primary">Reset</button>
      </section>
    `;
  }
}

customElements.define("pomo-timer-actions", PomoTimerActions);
