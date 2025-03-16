// const templatePomodoro = document.createElement("template");
// templatePomodoro.innerHTML = `
//   <section>
//     <pomo-heading-with-helper></pomo-heading-with-helper>
//     <pomo-task-form></pomo-task-form>
//   </section>
// `;
class PomodoroTimer extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  connectedCallback() {}

  render() {
    this.innerHTML = `
      <section class="pomodoro-timer">
        <pomo-heading-with-helper></pomo-heading-with-helper>
        <pomo-task-form></pomo-task-form>
        <pomo-timer></pomo-timer>
        <pomo-work-duration></pomo-work-duration>
      </section>
    `;
  }
}

customElements.define("pomodoro-timer", PomodoroTimer);
