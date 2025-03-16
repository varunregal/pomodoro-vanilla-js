class PomoWorkDuration extends HTMLElement {
  constructor() {
    super();
    this.workDurationList = [5, 15, 25, 30, 45, 60];
    this.render();
  }
  connectedCallback() {
    const workDurationButtons = document.querySelectorAll(
      ".work-duration__button"
    );
    workDurationButtons.forEach((workDurationButton) => {
      workDurationButton.addEventListener("click", (e) => {
        const workDurationButtonEvent = new CustomEvent("set-work-duration", {
          bubbles: true,
          composed: true,
          detail: {
            workDuration: parseInt(e.target.innerText),
          },
        });
        this.dispatchEvent(workDurationButtonEvent);
      });
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
