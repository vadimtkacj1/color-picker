import Color from "../data/color.js";
import Template from "./template.js";

class ColorPicker extends HTMLElement {
  static get observedAttributes() {
    return ["hex"];
  }

  static get DEFAULT_HEX() {
    return "#112981";
  }

  set hex(value) {
    this.setAttribute("hex", value);
  }

  get hex() {
    return this.getAttribute("hex");
  }

  #isChangedContentOfHue = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = Template.render();
    this.dom = Template.mapDOM(this.shadowRoot);

    this.dom.colorOfColorPicker.style.width = this.dom.inputColor.offsetHeight / 1.5 + "px";
    this.dom.colorOfColorPicker.style.height = this.dom.inputColor.offsetHeight / 1.5 + "px";

    this.dom.currentColor.addEventListener("change", this.onСurrentColor.bind(this));
    this.dom.content.addEventListener("change-position-thumb", this.onChangePositionThumb.bind(this));
    this.dom.formats.addEventListener("click", this.onFormats.bind(this));
    this.dom.inputColor.addEventListener("change", this.onСurrentColor.bind(this));
    this.dom.colorOfColorPicker.addEventListener("click", this.showColorPicker.bind(this));
    this.dom.wrapperColorPicker.addEventListener("click", this.hideColorPicker.bind(this));
    this.dom.copyColor.addEventListener("click", this.copyColor.bind(this));
    this.dom.staticColors.addEventListener("click", this.onStaticColor.bind(this));

    window.addEventListener("scroll", this.positionColorPicker.bind(this));
    this.positionColorPicker();
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this.positionColorPicker.bind(this));
  }

  onStaticColor(e) {
    const target = e.target;
    const color = target.dataset.hex;

    if (!color) return;

    if (color === this.hex) return;

    this.hex = color;
  }

  copyColor() {
    navigator.clipboard.writeText(this.hex);
  }

  hideColorPicker(e) {
    const target = e.target;
    if (target !== e.currentTarget) return;

    this.dom.wrapperColorPicker.classList.add("hidden");
  }

  showColorPicker() {
    this.dom.wrapperColorPicker.classList.remove("hidden");
  }

  positionColorPicker() {
    const coords = this.dom.colorOfColorPicker.getBoundingClientRect();

    const positionColorPickerLeft = coords.left - this.dom.colorPicker.offsetWidth + this.dom.colorOfColorPicker.offsetWidth;

    if (positionColorPickerLeft > 0) {
      this.dom.colorPicker.style.left = positionColorPickerLeft + "px";
    } else {
      this.dom.colorPicker.style.left = this.dom.inputColor.offsetWidth - coords.left + "px";
    }

    if (coords.top <= this.dom.colorPicker.offsetHeight) {
      this.dom.colorPicker.style.top = coords.top + this.dom.colorOfColorPicker.offsetHeight + "px";
    } else {
      this.dom.colorPicker.style.top = coords.top - this.dom.colorPicker.offsetHeight + "px";
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "hex":
        this.dom.currentColor.value = newValue;
        this.dom.chooseColor.style.background = newValue;
        this.dom.inputColor.value = newValue;
        this.dom.colorOfColorPicker.style.background = newValue;

        if (this.#isChangedContentOfHue) break;

        this.dom.content.lastElementChild.hex = newValue;
        break;
    }

    this.#isChangedContentOfHue = false;
  }

  connectedCallback() {
    if (!this.hex) {
      this.hex = ColorPicker.DEFAULT_HEX;
    }
  }

  onChangePositionThumb(e) {
    this.#isChangedContentOfHue = true;

    const target = e.target;
    this.hex = target.hex;
  }

  onFormats(e) {
    const target = e.target;
    const nameButton = target.dataset.name;

    if (!nameButton) return;

    this.dom.content.innerHTML = `<wcia-${nameButton} hex="${this.hex}"></wcia-${nameButton}>`;
    Array.from(e.currentTarget.children).forEach((format) => format.classList.remove("changed-format"));

    target.classList.add("changed-format");
  }

  onСurrentColor(e) {
    this.dom.content.lastElementChild.hex = Color.formatHex(e.currentTarget.value);
  }
}

customElements.define("wcia-colorpicker", ColorPicker);
