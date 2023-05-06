export default {
  render() {
    return `
            ${this.css()}
            ${this.html()}
        `;
  },

  mapDOM(scope) {
    return {
      formats: scope.querySelector(".formats"),
      content: scope.querySelector(".content"),
      currentColor: scope.getElementById("current-color"),
      chooseColor: scope.querySelector(".choose-color"),
      inputColor: scope.querySelector("#input-color input"),
      colorOfColorPicker: scope.querySelector("#color-of-color-picker"),
      colorPicker: scope.querySelector("#color-picker"),
      wrapperColorPicker: scope.querySelector("#wrapper-color-picker"),
      copyColor: scope.querySelector("#copy-color"),
      staticColors: scope.querySelector(".static-colors"),
    };
  },

  staticColors: ["#3f1182", "#2c0c5c", "#5e28b0", "#61863b", "#d93897"],

  getStaticColors() {
    let colors = "";

    this.staticColors.forEach((color) => {
      colors += `<div class="static-color" data-hex="${color}" style="background-color: ${color};"></div>`;
    });

    return colors;
  },

  html() {
    return `<div id="input-color"><input type="text"><div id="color-of-color-picker"></div></div>
    <div id="wrapper-color-picker" class="hidden">
    <div id="color-picker">
    <div class="choose-color">
    <svg xmlns="http://www.w3.org/2000/svg" id="copy-color" height="48" viewBox="0 96 960 960" width="48"><path d="M180 975q-24 0-42-18t-18-42V312h60v603h474v60H180Zm120-120q-24 0-42-18t-18-42V235q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440V235H300v560Zm0 0V235v560Z"/></svg>
    </div>
    <div class="color-picker-body">
      <div class="menu">
      <input type="text" id="current-color">
        <div class="formats">
          <span class="format changed-format" data-name="hsb">HSB</span>
          <span class="format" data-name="rgb">RGB</span>
          <span class="format" data-name="box">BOX</span>
        </div>
      </div>
      <div class="content"><wcia-hsb></wcia-hsb></div>
      <div class="static-colors">
      ${this.getStaticColors()}
      </div>
    </div>
    </div>
    </div>`;
  },

  css() {
    return `<style>
                :host {
                  display: flex;
                  font-family: "Inter", sans-serif;
                  --text-color: #B3B3B3; 
                  --border-radius: 5px;
                  --background-color: #fafafa;
                }
                
                #wrapper-color-picker {
                  position: fixed;
                  width: 100vw;
                  height: 100vh;
                  top: 0px;
                  left: 0px;
                }

                #copy-color:hover {
                  fill: white;
                }

                #input-color input:hover:not(:disabled) {
                  box-shadow:inset #b1b0b5 0 0 0 1px,inset white 0 0 0 100px !important;
                }

                #input-color input:focus:not(:disabled) {
                  box-shadow: inset #0066ff 0 0 0 1px,inset white 0 0 0 100px !important;
                  outline: none;
                }

                #copy-color {
                  position: relative;
                  width: 20px;
                  fill: var(--text-color);
                  left: 10px;
                  cursor: pointer;
                }

                #color-picker {
                    background-color: var(--background-color);
                    border-radius: var(--border-radius);
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    height: 300px;
                    width: 240px;
                    flex-direction: column;
                    position: absolute;
                    color: var(--text-color);
                    display: flex;
                }

                #input-color {
                  position: relative;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }

                #color-of-color-picker {
                  position: absolute;
                  left: 80%;
                  border-radius: var(--border-radius); 
                  cursor: pointer;
                  box-shadow: inset rgba(0, 0, 0, 0.075) 0 0 0 1px;
                }

                .static-colors {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                }

                .static-color {
                  width: 30px;
                  height: 30px;
                  background: blue;
                  border-radius: var(--border-radius); 
                  cursor: pointer;
                  box-shadow: inset rgba(0, 0, 0, 0.075) 0 0 0 1px;
                }

                #input-color input {
                  padding: 10px;
                  width: 100%;
                  height: 100%;
                  border-radius: var(--border-radius);
                  transition: box-shadow .1s;
                  box-shadow: inset #d8d8da 0 0 0 1px, inset white 0 0 0 100px !important;
                  border: none;
                }

                .hidden {
                  visibility: hidden;
                }

                .changed-format {
                  font-weight: bold;
                  color: #292828;
                }

                #current-color {
                  width: 60px;
                  text-align: center;
                  box-shadow: none;
                  border: none;
                  color: var(--text-color);
                  background-color: var(--background-color);
                }
                
                .choose-color {
                  background-color: red;
                  width: 100%;
                  height: 30%;
                  border-radius: var(--border-radius) var(--border-radius) 0px 0px;
                  box-shadow: inset rgba(0, 0, 0, 0.075) 0 0 0 1px;
                }
                
                .color-picker-body {
                  padding: 15px;
                  display: flex;
                  flex-direction: column;
                  max-width: 100%;
                  height: 70%;
                  margin-bottom: 20px;
                }
                
                .format {
                  cursor: pointer;
                  margin-right: 5px;
                }
                
                .sliders {
                  display: flex;
                  flex-direction: column;
                }
                
                .menu {
                  display: flex;
                  justify-content: space-between;
                }
                
                .content {
                  padding: 5px;
                  display: flex;
                  width: 100%;
                  height: 100%;
                  margin: 10px 0px 15px 0px
                }            
            </style>`;
  },
};
