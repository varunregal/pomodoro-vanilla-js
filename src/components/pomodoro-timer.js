class PomodoroTimer extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  connectedCallback() {}

  render() {
    this.innerHTML = `
      <section class="flex flex-col gap-10">
        <pomo-navbar></pomo-navbar>
        <pomo-task-form></pomo-task-form>
        <pomo-timer></pomo-timer>
        <pomo-timer-actions></pomo-timer-actions>
        <pomo-work-duration></pomo-work-duration>
      </section>
    `;
  }
}

customElements.define("pomodoro-timer", PomodoroTimer);
