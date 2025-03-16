class PomoTimer extends HTMLElement {
  constructor() {
    super();
    this.workDuration = 15;
    this.timeInSeconds = this.workDuration * 60;
    this.time = this.generateTime(this.timeInSeconds);
    this.timeIntervalId;
    this.render();
  }
  connectedCallback() {
    document.addEventListener("start-timer", () => {
      this.startTimer();
    });

    document.addEventListener("reset-timer", () => {
      this.resetTimer();
    });

    document.addEventListener("set-work-duration", (e) => {
      this.workDuration = e.detail.workDuration;
      this.render();
    });
  }

  disconnectedCallback() {
    this.clearTimer();
  }

  generateTime(duration) {
    const minutes = Math.floor(duration / 60);
    const subSeconds = duration - minutes * 60;

    return (
      minutes.toString() +
      ":" +
      (subSeconds < 10 ? "0" + subSeconds.toString() : subSeconds.toString())
    );
  }
  startTimer() {
    const startTime = Date.now();
    const initialSeconds = this.timeInSeconds;
    this.timeIntervalId = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      this.timeInSeconds = Math.max(0, initialSeconds - elapsedSeconds);

      this.time = this.generateTime(this.timeInSeconds);
      this.render();
    }, 1000);
  }

  resetTimer() {
    if (this.timeIntervalId) {
      this.clearTimer();
      this.timeInSeconds = this.workDuration * 60;
      this.time = this.generateTime(this.timeInSeconds);
      this.render();
    }
  }

  clearTimer() {
    clearInterval(this.timeIntervalId);
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
