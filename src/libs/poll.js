const axios = require("axios");

module.exports = class Poll {
  constructor({ address, display }) {
    this.address = address;
    this.display = display;
  }

  parse(response) {
    const {
      chains,
      losses,
      name,
      powerLevel,
      sasPercentile,
      synergies,
      wins,
    } = response.data.deck;

    let top = "";
    top += `NAME: ${name} | `;
    top += `AERC: ${synergies.rawAerc} | `;
    top += `SAS: ${synergies.sasRating} | `;
    top += `SAS%: ${sasPercentile.toFixed(2)} | `;

    let bottom = "";
    bottom += `LVL: ${powerLevel} | `;
    bottom += `WINS: ${wins} | `;
    bottom += `LOSS: ${losses} | `;
    bottom += `CHAIN: ${chains} | `;

    return [top, bottom];
  }

  init() {
    axios
      .get(this.address)
      .then((response) => this.display.render(this.parse(response)))
      .catch(() => this.display.render(["error | ", "please reset | "]));
  }
};
