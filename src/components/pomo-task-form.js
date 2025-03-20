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
      <form class="flex flex-col gap-4">
        <input name="task" placeholder="What are you planning to focus on today" class="form-input"/>
        <select class="form-select">
          <option>Development</option>
          <option>Education</option>
          <option>Hobbies</option>
        </select>
        <button type="submit" class='btn btn-primary'>Submit</button>
      </form>
    `;
  }
}

customElements.define("pomo-task-form", PomoTaskForm);
