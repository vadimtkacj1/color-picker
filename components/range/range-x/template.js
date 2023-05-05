export default {
  render() {
    return `
            ${this.html()}
            ${this.css()}
        `;
  },
  mapDOM(scope) {
    return {
      overlay: scope.getElementById("bg-overlay"),
      thumb: scope.getElementById("thumb"),
      valueRange: scope.getElementById("value-range"),
    };
  },
  html() {
    return `<div id="bg-overlay"><div id="thumb"><span></span></div></div><input type="text" id="value-range">`;
  },
  css() {
    return `<style>
    :host {
        display: flex;
        align-items: center;
        position: relative;
    }

    #value-range {
      width: 25px;
      margin-left: 10px;
      text-align: center;
      box-shadow: none;
      border: none;
      color: var(--text-color);
    }

    #bg-overlay {
      display: flex;
      align-items: center;
        position: relative;
        width: 100%;
        height: 50%;
        border-radius: 5px;
    }

    #bg-overlay #thumb:active {
      box-shadow: #0066ff 0 0 0 1px, rgba(0, 0, 0, 0.05) 0 10px 10px -5px;
  }

    #thumb:hover {
      box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 1px, rgba(0, 0, 0, 0.05) 0 10px 10px -5px;
    }

    #thumb {
      color: black;
      background: white;
      border-radius: 50%;
      box-shadow: rgba(0, 0, 0, 0.15) 0 0 0 1px, rgba(0, 0, 0, 0.05) 0 10px 10px -5px;
      cursor: grab;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #thumb span {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
      width: 50%;
      height: 50%;
      box-shadow: inset rgba(0, 0, 0, 0.15) 0 0 0 1px;
    }
    </style>`;
  },
};
