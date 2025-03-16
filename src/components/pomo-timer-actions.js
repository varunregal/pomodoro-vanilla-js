import {
  dispatchResetTimerEvent,
  dispatchStartTimerEvent,
} from "../utils/events";

class PomoTimerActions extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  connectedCallback() {
    const startButton = document.querySelector(".pomo-timer-actions__start");
    const pauseButton = document.querySelector(".pomo-timer-actions__pause");
    const resetButton = document.querySelector(".pomo-timer-actions__reset");

    startButton.addEventListener("click", () => {
      dispatchStartTimerEvent(this);
    });

    resetButton.addEventListener("click", () => {
      dispatchResetTimerEvent(this);
    });
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
