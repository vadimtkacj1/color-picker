import Template from "./template.js";

class CoordPicker extends HTMLElement {
  static get observedAttributes() {
    return ["x", "y", "background", "backgroundthumb"];
  }

  static get DEFAULT_X() {
    return 0;
  }

  static get DEFAULT_Y() {
    return 0;
  }

  set maxValue(value) {
    this.setAttribute("maxvalue", value);
  }

  set backgroundThumb(value) {
    this.setAttribute("backgroundthumb", value);
  }

  get backgroundThumb() {
    return this.getAttribute("backgroundthumb");
  }

  set x(value) {
    this.setAttribute("x", value);
  }

  set y(value) {
    this.setAttribute("y", value);
  }

  get x() {
    return this.getAttribute("x");
  }

  get y() {
    return this.getAttribute("y");
  }

  set background(value) {
    this.setAttribute("background", value);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = Template.render();
    this.dom = Template.mapDOM(this.shadowRoot);

    this.dom.thumb.style.width = this.offsetHeight / 10 + "px";
    this.dom.thumb.style.height = this.offsetHeight / 10 + "px";

    document.addEventListener("mousemove", (e) => this.eventHandler(e));
    document.addEventListener("mouseup", (e) => this.eventHandler(e));
    this.addEventListener("mousedown", (e) => this.eventHandler(e));
    document.addEventListener("touchmove", (e) => this.eventHandler(e));
    document.addEventListener("touchend", (e) => this.eventHandler(e));
    this.addEventListener("touchstart", this.eventHandler.bind(this), { passive: false });
  }

  attributeChangedCallback(name, oldVal, newValue) {
    switch (name) {
      case "x":
      case "y":
        this.refreshCoordinates();
        this.dispatchEvent(
          new CustomEvent("change-position-thumb", {
            bubbles: true,
            composed: true,
          })
        );
        break;
      case "background":
        this.style.background = newValue;
        break;
      case "backgroundthumb":
        this.dom.thumb.lastElementChild.style.background = newValue;
        break;
    }
  }

  connectedCallback() {
    if (!this.x) {
      this.x = CoordPicker.DEFAULT_X;
    }

    if (!this.y) {
      this.y = CoordPicker.DEFAULT_Y;
    }
  }

  eventHandler(e) {
    e.preventDefault();
    const bounds = this.getBoundingClientRect();
    const coords = {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    };

    switch (e.type) {
      case "mousedown":
      case "touchstart":
        this.isDragging = true;
        this.updateCoord(coords.x, coords.y);
        this.refreshCoordinates();
        break;

      case "mouseup":
      case "touchend":
        this.isDragging = false;
        break;

      case "mousemove":
      case "touchmove":
        if (this.isDragging) {
          this.updateCoord(coords.x, coords.y);
          this.refreshCoordinates();
        }
        break;
    }
  }

  updateCoord(x, y) {
    let hPos = x;
    let vPos = y;

    if (hPos > this.offsetWidth) {
      hPos = this.offsetWidth;
    }

    if (hPos < 0) {
      hPos = 0;
    }

    if (vPos > this.offsetHeight) {
      vPos = this.offsetHeight;
    }

    if (vPos < 0) {
      vPos = 0;
    }

    this.x = (hPos / this.offsetWidth) * 100;
    this.y = (vPos / this.offsetHeight) * 100;
  }

  disconnectedCallback() {
    document.removeEventListener("mousemove", this.eventHandler.bind(this));
    document.removeEventListener("mouseup", this.eventHandler.bind(this));
    document.removeEventListener("touchmove", this.eventHandler.bind(this));
    document.removeEventListener("touchend", this.eventHandler.bind(this));
  }

  refreshCoordinates() {
    this.dom.thumb.style.left = (this.x / 100) * this.offsetWidth - this.dom.thumb.offsetWidth / 2 + "px";
    this.dom.thumb.style.top = (this.y / 100) * this.offsetHeight - this.dom.thumb.offsetHeight / 2 + "px";
  }
}

customElements.define("wcia-coordpicker", CoordPicker);
