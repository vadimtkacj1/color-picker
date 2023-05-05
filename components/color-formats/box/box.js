import ColorFormat from "../color-format.js";
import Template from "./template.js";
import Color from "../../data/color.js";

class Box extends ColorFormat {
  constructor() {
    super();
    this.shadowRoot.innerHTML = Template.render();
    this.dom = Template.dom(this.shadowRoot);
  }

  changeValueThumbs(hex) {
    const { r, g, b } = Color.hexToRGB(hex);
    const hsb = Color.RGBToHSB(r, g, b);

    this.dom.hue.value = hsb[0];
    this.dom.coordpicker.x = hsb[1];
    this.dom.coordpicker.y = 100 - hsb[2];
    this.onChangeThumb();
  }

  onChangedPositionThumb() {
    const hsb = {
      h: this.dom.hue.value,
      s: this.dom.coordpicker.x,
      b: this.dom.coordpicker.y,
    };

    const rgb = Color.HSBToRGB(hsb.h, hsb.s, 100 - hsb.b);

    this.hex = Color.RGBtoHex(rgb[0], rgb[1], rgb[2]);

    this.dom.coordpicker.background = `rgb(${Color.HSBToRGB(hsb.h, 100, 100).join(", ")})`;

    this.dom.hue.backgroundThumb = `rgb(${Color.HSBToRGB(hsb.h, 100, 100).join(", ")})`;
    this.dom.coordpicker.backgroundThumb = this.hex;
  }
}

customElements.define("wcia-box", Box);
