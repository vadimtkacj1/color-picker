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
    };
  },
  html() {
    return `<div id="bg-overlay"><div id="thumb"><span></span></div></div>`;
  },
  css() {
    return `<style>
    :host {
        display: flex;
        align-items: center;
        position: relative;
    }

    #bg-overlay {
      display: flex;
      justify-content: center;
      position: relative;
      width: 50%;
      height: 100%;
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
