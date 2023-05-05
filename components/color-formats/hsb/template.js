import Color from "../../data/color.js";

export default {
  render() {
    return `
        ${this.html()}
        ${this.css()}`;
  },

  dom(scope) {
    return {
      saturation: scope.getElementById("saturation"),
      hue: scope.getElementById("hue"),
      brightness: scope.getElementById("brightness"),
    };
  },

  html() {
    return `
            <wcia-range-x
              id="hue",
              maxValue="360", background="linear-gradient(to right, red 0%, #ff0 17%, lime 33%, cyan 50%, blue 66%, #f0f 83%, red 100%)"
            ></wcia-range-x>
            <wcia-range-x id="saturation"></wcia-range-x>
            <wcia-range-x id="brightness"></wcia-range-x>
    `;
  },

  backgroundSaturation(hsb) {
    const { h, s, b } = hsb;
    const leftColor = Color.HSBToRGB(0, 0, b).join(", ");
    const centerColor = Color.HSBToRGB(h, 50, b).join(", ");
    const rightColor = Color.HSBToRGB(h, 100, b).join(", ");
    return `-webkit-linear-gradient(left, rgb(${leftColor}), rgb(${centerColor}), rgb(${rightColor}))`;
  },

  backgroundBrightness(hsb) {
    const { h, s, b } = hsb;
    const centerColor = Color.HSBToRGB(h, s, 50).join(", ");
    const rightColor = Color.HSBToRGB(h, s, 100).join(", ");
    return `-webkit-linear-gradient(left, rgb(0, 0, 0), rgb(${centerColor}), rgb(${rightColor}))`;
  },

  css() {
    return `<style>
      :host {
        width: 100%;
        display: flex;
        justify-content: space-around;
        height: 100%;
        flex-direction: column;
      }
        wcia-range-x {
            width: 100%;
            height: 20px;
            margin-bottom: 10px;
        }
    </style>`;
  },
};
