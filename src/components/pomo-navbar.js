class PomoNavbar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav class="flex justify-between items-center mt-4">
        <p class="text-md font-bold">FocusFlo</p>
        <ul class="list-none flex gap-10">
          <li class="font-medium text-sm">Settings</li>
          <li class="font-medium text-sm">Sign In</li>
        </ul>
      </nav>
    `;
  }
}

customElements.define("pomo-navbar", PomoNavbar);
