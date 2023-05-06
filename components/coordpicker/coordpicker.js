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

    document.addEventListener("mousemove", this.eventHandlerMouse(this));
    document.addEventListener("mouseup", this.eventHandlerMouse.bind(this));
    this.addEventListener("mousedown", this.eventHandlerMouse.bind(this));
    document.addEventListener("touchmove", this.eventHandlerTouch.bind(this));
    document.addEventListener("touchend", this.eventHandlerTouch.bind(this));
    this.addEventListener("touchstart", this.eventHandlerTouch.bind(this), { passive: false });
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

  eventHandlerTouch(e) {
    this.eventHandler(e, e.changedTouches[0]);
  }

  eventHandlerMouse(e) {
    this.eventHandler(e, e);
  }

  eventHandler(event, elem) {
    const bounds = this.getBoundingClientRect();
    const coords = {
      x: elem.clientX - bounds.left,
      y: elem.clientY - bounds.top,
    };

    switch (event.type) {
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
    let posX = x;
    let posY = y;

    if (posX > this.offsetWidth) {
      posX = this.offsetWidth;
    }

    if (posX < 0) {
      posX = 0;
    }

    if (posY > this.offsetHeight) {
      posY = this.offsetHeight;
    }

    if (posY < 0) {
      posY = 0;
    }

    this.x = (posX / this.offsetWidth) * 100;
    this.y = (posY / this.offsetHeight) * 100;
  }

  disconnectedCallback() {
    document.removeEventListener("mousemove", this.eventHandlerMouse.bind(this));
    document.removeEventListener("mouseup", this.eventHandlerMouse.bind(this));
    document.removeEventListener("touchmove", this.eventHandlerTouch.bind(this));
    document.removeEventListener("touchend", this.eventHandlerTouch.bind(this));
  }

  refreshCoordinates() {
    this.dom.thumb.style.left = (this.x / 100) * this.offsetWidth - this.dom.thumb.offsetWidth / 2 + "px";
    this.dom.thumb.style.top = (this.y / 100) * this.offsetHeight - this.dom.thumb.offsetHeight / 2 + "px";
  }
}

customElements.define("wcia-coordpicker", CoordPicker);
