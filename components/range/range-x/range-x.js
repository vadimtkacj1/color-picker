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
    let hPos = x;

    if (hPos > this.dom.overlay.offsetWidth) {
      hPos = this.dom.overlay.offsetWidth;
    }

    if (hPos < 0) {
      hPos = 0;
    }

    this.value = (hPos / this.dom.overlay.offsetWidth) * this.maxValue;
  }

  refreshRange(value) {
    this.dom.thumb.style.left = (value / this.maxValue) * this.dom.overlay.offsetWidth - this.dom.thumb.offsetWidth / 2 + "px";
    this.dom.valueRange.value = Math.ceil(value);
  }

  eventHandler(e) {
    const bounds = this.getBoundingClientRect();
    let x;

    if (e instanceof TouchEvent) {
      x = e.changedTouches[0].clientX - bounds.left;
    } else {
      x = e.clientX - bounds.left;
    }

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
