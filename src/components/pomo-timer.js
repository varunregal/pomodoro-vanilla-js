class PomoTimer extends HTMLElement {
  constructor() {
    super();
    this.timeIntervalId;
    this.workDuration = 15;
    this.setTime();
    this.render();
  }
  connectedCallback() {
    document.addEventListener("start-timer", () => {
      this.startTimer();
    });

    document.addEventListener("pause-timer", () => {
      this.pauseTimer();
    });

    document.addEventListener("reset-timer", () => {
      this.resetTimer();
    });

    document.addEventListener("set-work-duration", (e) => {
      this.workDuration = e.detail.workDuration;
      this.setTime();
      this.render();
    });
  }

  disconnectedCallback() {
    this.clearTimer();
    document.removeEventListener("start-timer");
    document.removeEventListener("pause-timer");
    document.removeEventListener("reset-timer");
    document.removeEventListener("set-work-duration");
  }

  setTime() {
    this.timeInSeconds = this.workDuration * 60;
    this.time = this.generateTime(this.timeInSeconds);
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
    if (!this.timeIntervalId) {
      const startTime = Date.now();
      const initialSeconds = this.timeInSeconds;
      this.timeIntervalId = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        this.timeInSeconds = Math.max(0, initialSeconds - elapsedSeconds);

        this.time = this.generateTime(this.timeInSeconds);
        this.render();
      }, 1000);
    }
    console.log(this.timeIntervalId);
  }

  pauseTimer() {
    if (this.timeIntervalId) this.clearTimer();
  }

  resetTimer() {
    this.clearTimer();
    this.setTime();
    this.render();
  }

  clearTimer() {
    clearInterval(this.timeIntervalId);
    this.timeIntervalId = undefined;
    console.log(this.timeIntervalId);
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
