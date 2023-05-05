export default {
  HSBToRGB(h, s, b) {
    s /= 100;
    b /= 100;
    const k = (n) => (n + h / 60) % 6;
    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));

    return [Math.round(255 * f(5)), Math.round(255 * f(3)), Math.round(255 * f(1))];
  },

  RGBToHSB(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const v = Math.max(r, g, b),
      n = v - Math.min(r, g, b);
    const h = n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
    return [Math.round(60 * (h < 0 ? h + 6 : h)), Math.round(v && (n / v) * 100), Math.round(v * 100)];
  },

  RGBtoHex(r, g, b) {
    if (typeof r === "object") {
      g = r.g;
      b = r.b;
      r = r.r;
    }
    return "#" + this.toHex(parseInt(r)) + this.toHex(parseInt(g)) + this.toHex(parseInt(b));
  },

  hexToRGB(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    let target;
    if (hex.charAt(0) === "#") {
      target = 7;
    } else if (hex.charAt(0) !== "#") {
      target = 6;
    }

    while (hex.length < target) {
      hex += "0";
    }

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  },

  formatHex(val) {
    if (val.charAt(0) !== "#") {
      val = "#" + val;
    }

    while (val.length < 7) {
      val += "0";
    }

    if (val.length > 7) {
      val = val.slice(0, 7);
    }

    return val;
  },

  toHex(val) {
    let hex = Number(val).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  },
};
