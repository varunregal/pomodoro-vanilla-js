import { setDurationObservable } from "../utils/observables/set-duration-observable";

class PomoWorkDuration extends HTMLElement {
  constructor() {
    super();
    this.setUpInstances();
    this.render();
    this.setUpReferences();
  }

  setUpInstances() {
    this.workDurationList = [5, 15, 25, 30, 45, 60];
    this.selected = this.workDurationList[1];
    this.selectedClasses = ["bg-indigo-500", "text-white"];
  }

  setUpReferences() {
    this.workDurationButtons = this.querySelectorAll("button");
  }
  connectedCallback() {
    this.workDurationButtons.forEach((workDurationButton) => {
      workDurationButton.addEventListener("click", (e) => {
        this.selected = parseInt(e.target.textContent);
        this.removeSelectedDurationClasses();
        workDurationButton.classList.add(...this.selectedClasses);
        setDurationObservable.broadcast({ workDuration: this.selected });
      });
    });
  }

  disconnectedCallback() {
    this.workDurationButtons.forEach((workDurationButton) => {
      workDurationButton.removeEventListener();
    });
  }

  removeSelectedDurationClasses() {
    this.workDurationButtons.forEach((item) => {
      if (parseInt(item.textContent) !== this.selected) {
        item.classList.remove(...this.selectedClasses);
      }
    });
  }
  generateWorkDurationTabs() {
    return this.workDurationList
      .map((duration) => {
        return `
          <li>
            <button class="btn btn-secondary ${
              this.selected === duration
                ? [...this.selectedClasses].join(" ")
                : ""
            }">
              ${duration}
            </button>
          </li>
        `;
      })
      .join("");
  }
  render() {
    this.innerHTML = `
      <section class="flex flex-col gap-4">
        <ul class="work-duration__list list-none flex gap-4">
          ${this.generateWorkDurationTabs()}
        </ul>
      </section>
    `;
  }
}

customElements.define("pomo-work-duration", PomoWorkDuration);
