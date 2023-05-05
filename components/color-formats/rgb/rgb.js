import Color from "../../data/color.js";
import ColorFormat from "../color-format.js";
import Template from "./template.js";

class Rgb extends ColorFormat {
  constructor() {
    super();
    this.shadowRoot.innerHTML = Template.render();
    this.dom = Template.dom(this.shadowRoot);
  }

  changeValueThumbs(hex) {
    const { r, g, b } = Color.hexToRGB(hex);

    this.dom.red.value = r;
    this.dom.green.value = g;
    this.dom.blue.value = b;
    this.onChangeThumb();
  }

  onChangedPositionThumb() {
    const rgb = {
      r: this.dom.red.value,
      g: this.dom.green.value,
      b: this.dom.blue.value,
    };

    this.hex = Color.RGBtoHex(rgb.r, rgb.g, rgb.b);

    this.dom.red.background = Template.backgroundRed(rgb);
    this.dom.green.background = Template.backgroundGreen(rgb);
    this.dom.blue.background = Template.backgroundBlue(rgb);

    this.dom.red.backgroundThumb = this.hex;
    this.dom.green.backgroundThumb = this.hex;
    this.dom.blue.backgroundThumb = this.hex;
  }
}

customElements.define("wcia-rgb", Rgb);
