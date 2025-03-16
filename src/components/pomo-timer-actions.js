import {
  dispatchResetTimerEvent,
  dispatchStartTimerEvent,
} from "../utils/events";

class PomoTimerActions extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.startButton = document.querySelector(".pomo-timer-actions__start");
    this.pauseButton = document.querySelector(".pomo-timer-actions__pause");
    this.resetButton = document.querySelector(".pomo-timer-actions__reset");
  }
  connectedCallback() {
    this.startButton.addEventListener("click", () => {
      dispatchStartTimerEvent(this);
    });

    this.resetButton.addEventListener("click", () => {
      dispatchResetTimerEvent(this);
    });
  }

  disconnectedCallback() {
    this.startButton.removeEventListener();
    this.resetButton.removeEventListener();
  }
  render() {
    this.innerHTML = `
      <section class="pomo-timer-actions">
        <button class="pomo-timer-actions__start">Start</button>
        <button class="pomo-timer-actions__pause">Pause</button>
        <button class="pomo-timer-actions__reset">Reset</button>
      </section>
    `;
  }
}

customElements.define("pomo-timer-actions", PomoTimerActions);
