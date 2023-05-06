import Template from "./template.js";
import Range from "../range.js";

class RangeY extends Range {
  constructor() {
    super();
    this.shadowRoot.innerHTML = Template.render();
    this.dom = Template.mapDOM(this.shadowRoot);

    this.changeSizeThumb(this.offsetWidth);
  }

  updateY(y) {
    let hPos = y;

    if (hPos > this.dom.overlay.offsetHeight) {
      hPos = this.dom.overlay.offsetHeight;
    }

    if (hPos < 0) {
      hPos = 0;
    }

    this.value = (hPos / this.dom.overlay.offsetHeight) * this.maxValue;
  }

  refreshRange(value) {
    this.dom.thumb.style.bottom = (value / this.maxValue) * this.dom.overlay.offsetHeight - this.dom.thumb.offsetHeight / 2 + "px";
  }

  eventHandler(e) {
    const bounds = this.getBoundingClientRect();
    const y = bounds.bottom - e.clientY;

    switch (e.type) {
      case "mousedown":
      case "touchstart":
        this.isdragging = true;
        this.updateY(y);
        this.refreshRange(this.value);
        break;

      case "mouseup":
      case "touchend":
        this.isdragging = false;
        break;

      case "mousemove":
      case "touchmove":
        if (this.isdragging) {
          this.updateY(y);
          this.refreshRange(this.value);
        }
        break;
    }
  }
}

customElements.define("wcia-range-y", RangeY);
