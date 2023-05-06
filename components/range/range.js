class Range extends HTMLElement {
  static get observedAttributes() {
    return ["value", "background", "backgroundthumb"];
  }

  static get DEFAULT_VALUE() {
    return 0;
  }

  static get DEFAULT_MAXVALUE() {
    return 100;
  }

  static get DEFAULT_BACKGROUND() {
    return "blue";
  }

  static get CHANGE_VALUE_COLOR() {
    return;
  }

  set value(value) {
    this.setAttribute("value", value);
  }

  set backgroundThumb(value) {
    this.setAttribute("backgroundthumb", value);
  }

  get backgroundThumb() {
    return this.getAttribute("backgroundthumb");
  }

  set background(value) {
    this.setAttribute("background", value);
  }

  get value() {
    return this.getAttribute("value");
  }

  set maxValue(value) {
    this.setAttribute("maxValue", value);
  }

  get maxValue() {
    return this.getAttribute("maxValue");
  }

  get background() {
    return this.getAttribute("background");
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  changeSizeThumb(size) {
    this.dom.thumb.style.width = size + "px";
    this.dom.thumb.style.height = size + "px";
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "value":
        this.refreshRange(newValue);
        this.dispatchEvent(
          new CustomEvent("change-position-thumb", {
            bubbles: true,
            composed: true,
          })
        );
        break;
      case "background":
        this.setColor(newValue);
        break;
      case "backgroundthumb":
        this.dom.thumb.lastElementChild.style.background = newValue;
        break;
    }
  }

  eventHandlerInput(e) {
    const target = e.target;

    if (+target.value < 0) {
      target.value = 0;
    } else if (+target.value > +this.maxValue) {
      target.value = this.maxValue;
    }

    this.value = target.value;
  }

  connectedCallback() {
    document.addEventListener("mousemove", this.eventHandlerMouse.bind(this));
    document.addEventListener("mouseup", this.eventHandlerMouse.bind(this));
    this.dom.overlay.addEventListener("mousedown", this.eventHandlerMouse.bind(this));
    document.addEventListener("touchmove", this.eventHandlerTouch.bind(this));
    document.addEventListener("touchend", this.eventHandlerTouch.bind(this));
    this.dom.overlay.addEventListener("touchstart", this.eventHandlerTouch.bind(this), { passive: false });

    if (!this.maxValue) {
      this.maxValue = Range.DEFAULT_MAXVALUE;
    }

    if (!this.value) {
      this.value = Range.DEFAULT_VALUE;
    }

    if (!this.background) {
      this.background = Range.DEFAULT_BACKGROUND;
    }
  }

  setColor(color) {
    this.dom.overlay.style.background = color;
  }

  disconnectedCallback() {
    document.removeEventListener("mousemove", this.eventHandlerMouse.bind(this));
    document.removeEventListener("mouseup", this.eventHandlerMouse.bind(this));
    document.removeEventListener("touchmove", this.eventHandlerTouch.bind(this));
    document.removeEventListener("touchend", this.eventHandlerTouch.bind(this));
  }

  eventHandlerTouch(e) {
    this.eventHandler(e, e.changedTouches[0]);
  }

  eventHandlerMouse(e) {
    this.eventHandler(e, e);
  }

  refreshRange() {}

  eventHandler() {}
}

export default Range;
