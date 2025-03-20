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
      <div class="text-center mt-10">
          <h2 class='text-3xl font-bold'>${heading}</h2>
          <p class='text-gray-600'>${helper}</p>
        </slot>
      </div>
    `;
  }
}

customElements.define("pomo-heading-with-helper", PomoHeadingWithHelper);
