import { dispatchStartTimerEvent } from "../utils/events";

class PomoTaskForm extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.taskForm = document.querySelector(".task-form");
  }
  connectedCallback() {
    this.taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.startTimer();
    });
  }

  disconnectedCallback() {
    this.taskForm.removeEventListener();
  }

  startTimer() {
    dispatchStartTimerEvent(this);
  }

  render() {
    this.innerHTML = `
      <form class="task-form">
        <input name="task" placeholder="What are you planning to focus on today" class="task-input"/>
        <select class="task-select">
          <option>Development</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    `;
  }
}

customElements.define("pomo-task-form", PomoTaskForm);
