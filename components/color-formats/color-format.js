class ColorFormat extends HTMLElement {
  static get observedAttributes() {
    return ["hex"];
  }

  static get DEFAULT_HEX() {
    return "#123341";
  }

  get hex() {
    return this.getAttribute("hex");
  }

  set hex(value) {
    this.setAttribute("hex", value);
  }

  #isChangedPositionThumb = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "hex":
        if (this.#isChangedPositionThumb) break;

        this.changeValueThumbs(newValue);
        break;
    }

    this.#isChangedPositionThumb = false;
  }

  onChangeThumb() {
    this.#isChangedPositionThumb = true;
    this.onChangedPositionThumb();
  }

  connectedCallback() {
    this.addEventListener("change-position-thumb", () => this.onChangeThumb());

    if (!this.hex) {
      this.hex = ColorFormat.DEFAULT_HEX;
    }
  }

  changeValueThumbs() {}
  onChangedPositionThumb() {}
}

export default ColorFormat;
