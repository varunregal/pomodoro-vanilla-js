class PomoHeadingWithHelper extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  static get observedAttributes() {
    return ["heading", "helper"];
  }

  render() {
    const heading = this.getAttribute("heading") || "Work Time";
    const helper = this.getAttribute("helper") || "Focus on one task at a time";
    this.innerHTML = `
      <div class="heading-with-helper">
          <h2>${heading}</h2>
          <p>${helper}</p>
        </slot>
      </div>
    `;
  }
}

customElements.define("pomo-heading-with-helper", PomoHeadingWithHelper);
