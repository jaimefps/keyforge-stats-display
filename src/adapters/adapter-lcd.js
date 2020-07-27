const j5 = require("johnny-five");

module.exports = class AdapterLCD {
  constructor() {
    this.lcd = new j5.LCD({
      pins: [7, 8, 9, 10, 11, 12],
    });
  }

  handle(rows) {
    rows.forEach((r, i) => this.lcd.cursor(i, 0).print(r));
  }
};
