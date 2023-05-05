export default {
  render() {
    return `
        ${this.html()}
        ${this.css()}`;
  },

  dom(scope) {
    return {
      hue: scope.getElementById("hue"),
      coordpicker: scope.getElementById("coordpicker"),
    };
  },

  html() {
    return `
          <wcia-coordpicker id="coordpicker"></wcia-coordpicker>
          <wcia-range-y
          id="hue",
          maxValue="360", background="linear-gradient(to top, red 0%, #ff0 17%, lime 33%, cyan 50%, blue 66%, #f0f 83%, red 100%)"
        ></wcia-range-y>
    `;
  },

  css() {
    return `<style>
        :host {
          display: flex;
          width: 100%;
          height: 100%;
        }

        wcia-coordpicker {
          width: 100%;
          height 100%;
        }

        #hue {
          margin-left: 20px;
          width: 20px;
          height 100%;
        }

    </style>`;
  },
};
