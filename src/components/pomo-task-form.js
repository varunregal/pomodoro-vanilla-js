import { dispatchStartTimerEvent } from "../utils/events";

class PomoTaskForm extends HTMLElement {
  constructor() {
    super();

    this.render();
  }
  connectedCallback() {
    const taskForm = document.querySelector(".task-form");

    taskForm.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();
        this.startTimer();
      }.bind(this)
    );
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
