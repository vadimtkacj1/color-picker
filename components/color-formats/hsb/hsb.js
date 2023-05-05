import Color from "../../data/color.js";
import ColorFormat from "../color-format.js";
import Template from "./template.js";

class HSB extends ColorFormat {
  constructor() {
    super();
    this.shadowRoot.innerHTML = Template.render();
    this.dom = Template.dom(this.shadowRoot);
  }

  changeValueThumbs(hex) {
    const { r, g, b } = Color.hexToRGB(hex);
    const hsb = Color.RGBToHSB(r, g, b);

    this.dom.hue.value = hsb[0];
    this.dom.saturation.value = hsb[1];
    this.dom.brightness.value = hsb[2];
    this.onChangeThumb();
  }

  onChangedPositionThumb() {
    const hsb = {
      h: this.dom.hue.value,
      s: this.dom.saturation.value,
      b: this.dom.brightness.value,
    };

    const rgb = Color.HSBToRGB(hsb.h, hsb.s, hsb.b);

    this.hex = Color.RGBtoHex(rgb[0], rgb[1], rgb[2]);

    this.dom.saturation.background = Template.backgroundSaturation(hsb);
    this.dom.brightness.background = Template.backgroundBrightness(hsb);
    this.dom.hue.backgroundThumb = `rgb(${Color.HSBToRGB(hsb.h, 100, 100).join(", ")})`;

    this.dom.saturation.backgroundThumb = this.hex;
    this.dom.brightness.backgroundThumb = this.hex;
  }
}

customElements.define("wcia-hsb", HSB);
