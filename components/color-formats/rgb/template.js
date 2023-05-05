export default {
  render() {
    return `
        ${this.html()}
        ${this.css()}`;
  },

  dom(scope) {
    return {
      red: scope.getElementById("red"),
      green: scope.getElementById("green"),
      blue: scope.getElementById("blue"),
    };
  },

  html() {
    return `
            <wcia-range-x
              id="red", maxValue="255"
            ></wcia-range-x>
            <wcia-range-x id="green", maxValue="255"></wcia-range-x>
            <wcia-range-x id="blue", maxValue="255"></wcia-range-x>
    `;
  },

  backgroundRed(rgb) {
    const { r, g, b } = rgb;
    return `-webkit-linear-gradient(left, rgb(0, ${g}, ${b}), rgb(128, ${g}, ${b}), rgb(255, ${g}, ${b}))`;
  },

  backgroundGreen(rgb) {
    const { r, g, b } = rgb;
    return `-webkit-linear-gradient(left, rgb(${r}, 0, ${b}), rgb(${r}, 128, ${b}), rgb(${r}, 255, ${b})`;
  },

  backgroundBlue(rgb) {
    const { r, g, b } = rgb;
    return `-webkit-linear-gradient(left, rgb(${r}, ${g}, 0), rgb(${r}, ${g}, 128), rgb(${r}, ${g}, 255))`;
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
