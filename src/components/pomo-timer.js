class PomoTimer extends HTMLElement {
  constructor() {
    super();
    this.workDuration = 15;
    this.timeIntervalId;
    this.render();
  }
  connectedCallback() {
    document.addEventListener("start-timer", () => {
      this.startTimer();
    });

    document.addEventListener("set-work-duration", (e) => {
      this.workDuration = e.detail.workDuration;
      this.render();
    });
  }
  disonnectedCallback() {
    this.clearTimer();
  }
  startTimer() {
    this.timeIntervalId = setInterval(() => {
      this.workDuration -= 1;
      if (this.workDuration === 0) this.clearTimer();
      this.render();
    }, 1000);
  }

  clearTimer() {
    clearInterval(this.timeIntervalId);
  }

  render() {
    this.innerHTML = this.workDuration;
  }
}

customElements.define("pomo-timer", PomoTimer);
