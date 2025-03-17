import {
  dispatchResetTimerEvent,
  dispatchStartTimerEvent,
  dispatchPauseTimerEvent,
} from "../utils/events";

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
      this.handleStartPauseButtonClick
    );

    this.resetButton.addEventListener("click", this.handleResetButtonClick);
  }
  connectedCallback() {
    this.setUpEventListeners();
  }

  handleStartPauseButtonClick = () => {
    if (this.isClockRunning) {
      dispatchPauseTimerEvent(this);
      this.updateStartPauseText("Start");
    } else {
      dispatchStartTimerEvent(this);
      this.updateStartPauseText("Pause");
    }
    this.setIsClockRunning(!this.isClockRunning);
  };

  handleResetButtonClick = () => {
    dispatchResetTimerEvent(this);
    this.setIsClockRunning(false);
    this.updateStartPauseText("Start");
  };

  disconnectedCallback() {
    if (this.startPauseButton)
      this.startPauseButton.removeEventListener(
        "click",
        this.handleStartPauseButtonClick
      );
    if (this.resetButton)
      this.resetButton.removeEventListener(
        "click",
        this.handleResetButtonClick
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
