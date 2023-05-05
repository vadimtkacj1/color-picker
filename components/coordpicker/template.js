export default {
  render() {
    return `
            ${this.css()}
            ${this.html()}
        `;
  },

  mapDOM(scope) {
    return {
      thumb: scope.getElementById("thumb"),
    };
  },

  html() {
    return `<div id="bg-overlay-a"></div>
            <div id="bg-overlay-b"></div>
            <div id="thumb"><span></span></div>`;
  },

  css() {
    return `<style>
                :host {
                    display: flex;
                    position: relative;
                    border-radius: var(--border-radius);
                }
                
                #bg-overlay-a {
                    width: 100%;
                    height: 100%;
                    border-radius: var(--border-radius);
                    position: absolute;
                    background: linear-gradient(to right, #fff 0%, rgba(255,255,255,0) 100%);
                }
                
                #bg-overlay-b {
                    width: 100%;
                    height: 100%;
                    border-radius: var(--border-radius);
                    position: absolute;
                    background: linear-gradient(to bottom, transparent 0%, #000 100%);
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
