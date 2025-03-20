import { setDurationObservable } from "../utils/observables/set-duration-observable";

class PomoWorkDuration extends HTMLElement {
  constructor() {
    super();
    this.workDurationList = [5, 15, 25, 30, 45, 60];
    this.render();
    this.workDurationButtons = document.querySelectorAll(
      ".work-duration__button"
    );
  }
  connectedCallback() {
    this.workDurationButtons.forEach((workDurationButton) => {
      workDurationButton.addEventListener("click", (e) => {
        setDurationObservable.broadcast({ workDuration: e.target.textContent });
      });
    });
  }

  disconnectedCallback() {
    this.workDurationButtons.forEach((workDurationButton) => {
      workDurationButton.removeEventListener();
    });
  }
  generateWorkDurationTabs() {
    return this.workDurationList
      .map((duration) => {
        return `
          <li class="work-duration__list-item">
            <button class="work-duration__button">${duration}</button>
          </li>
        `;
      })
      .join("");
  }
  render() {
    this.innerHTML = `
      <section class="work-duration">
        <ul class="work-duration__list">
          ${this.generateWorkDurationTabs()}
        </ul>
      </section>
    `;
  }
}

customElements.define("pomo-work-duration", PomoWorkDuration);
