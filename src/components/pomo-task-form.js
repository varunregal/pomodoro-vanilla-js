import { timerObservable } from "../utils/observables/timer-observable";

class PomoTaskForm extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.taskForm = this.querySelector("form");
  }
  connectedCallback() {
    // this.taskForm.addEventListener("submit", (e) => {
    //   e.preventDefault();
    //   this.startTimer();
    // });
  }

  disconnectedCallback() {
    // this.taskForm.removeEventListener();
  }

  // startTimer() {
  //   timerObservable.broadcast("start-timer");
  // }

  render() {
    this.innerHTML = `
    <section class="flex flex-col gap-4">
      <input name="task" placeholder="What are you planning to focus on today" class="form-input"/>
      <input type="number" placeholder="Target Sessions" class="form-input w-full md:w-1/3"/>
    </section>
    `;
  }
}

customElements.define("pomo-task-form", PomoTaskForm);
