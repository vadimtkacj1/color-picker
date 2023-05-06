import Template from "./template.js";
import Range from "../range.js";

class RangeX extends Range {
  constructor() {
    super();
    this.shadowRoot.innerHTML = Template.render();
    this.dom = Template.mapDOM(this.shadowRoot);

    this.changeSizeThumb(this.offsetHeight);
    this.dom.valueRange.addEventListener("change", this.eventHandlerInput.bind(this));
  }

  updateX(x) {
    let pos = x;

    if (pos > this.dom.overlay.offsetWidth) {
      pos = this.dom.overlay.offsetWidth;
    }

    if (pos < 0) {
      pos = 0;
    }

    this.value = (pos / this.dom.overlay.offsetWidth) * this.maxValue;
  }

  refreshRange(value) {
    this.dom.thumb.style.left = (value / this.maxValue) * this.dom.overlay.offsetWidth - this.dom.thumb.offsetWidth / 2 + "px";
    this.dom.valueRange.value = Math.ceil(value);
  }

  eventHandler(e, elem) {
    const bounds = this.getBoundingClientRect();
    const x = elem.clientX - bounds.left;

    switch (e.type) {
      case "touchstart":
      case "mousedown":
        this.isdragging = true;
        this.updateX(x);
        this.refreshRange(this.value);
        break;

      case "mouseup":
      case "touchend":
        this.isdragging = false;
        break;

      case "touchmove":
      case "mousemove":
        if (this.isdragging) {
          this.updateX(x);
          this.refreshRange(this.value);
        }
        break;
    }
  }
}

customElements.define("wcia-range-x", RangeX);
