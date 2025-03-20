import { timerObservable } from "../utils/observables/timer-observable";

class PomoTaskForm extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.setUpReferences();
  }
  setUpReferences() {
    this.taskForm = this.querySelector("form");
    this.taskGroup = this.querySelector(".task-group");
    this.taskName = this.querySelector(".task-name");
    this.currentSession = this.querySelector(".current-session");
  }
  setUpListeners() {
    this.taskForm.addEventListener("submit", this.handleFormSubmit.bind(this));
  }
  handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("task-name-input");
    const sessions = formData.get("task-target-sessions-input");

    // use proxy for adding validations to the form
  }
  connectedCallback() {
    this.setUpListeners();
    this.taskGroup.classList.add("hidden");
  }

  disconnectedCallback() {}

  render() {
    this.innerHTML = /*html */ `
      <section>
        <form class='flex gap-4 items-center'>
          <input type="text" name="task-name-input" class="form-input w-1/2" minLength="4" placeholder="Enter your current focus task"/>
          <input type="number" min="1" name="task-target-sessions-input" class="form-input w-1/3" placeholder="Target sessions"/>
          <button type="submit" class="btn btn-primary w-1/5">Submit</button>
        </form>
        <div class="flex gap-4 items-center task-group">
          <p class="w-1/2 task-name">Name</p>
          <p class="w-1/3 current-session">1/4</p>
          <button class="w-1/5 edit btn btn-primary">Edit</button>
        </div>
      </section>
    `;
  }
}

customElements.define("pomo-task-form", PomoTaskForm);
