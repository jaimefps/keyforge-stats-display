const axios = require("axios");

class TextScroll {
  constructor(text, size) {
    this.location = 0;
    this.size = size;
    this.text = text;
  }

  next() {
    const chunk = this.text.slice(this.location, this.size + this.location);
    this.location = this.location >= this.text.length ? 0 : this.location + 1;
    const adjusted =
      chunk.length < this.size
        ? chunk + this.text.slice(0, this.size - chunk.length)
        : chunk;
    return adjusted;
  }
}

class Billboard {
  constructor(deckId) {
    this.size = 16;
    this.speed = 125;
    this.renderId = null;
    this.pullInterval = 1000 * 60 * 10;
    this.address = `https://decksofkeyforge.com/api/decks/with-synergies/${deckId}`;
  }

  error() {
    return {
      top: "loading error...",
      bottom: "will retry soon...",
    };
  }

  success({ deck }) {
    let top = "";
    top += `NAME: ${deck.name} | `;
    top += `AERC: ${deck.synergies.rawAerc} | `;
    top += `SAS: ${deck.synergies.sasRating} | `;
    top += `SAS%: ${deck.sasPercentile.toFixed(2)} | `;

    let bottom = "";
    bottom += `LVL: ${deck.powerLevel} | `;
    bottom += `WINS: ${deck.wins} | `;
    bottom += `LOSS: ${deck.losses} | `;
    bottom += `CHAIN: ${deck.chains} | `;

    return {
      top,
      bottom,
    };
  }

  render({ top, bottom }) {
    const topScroll = new TextScroll(top, this.size);
    const bottomScroll = new TextScroll(bottom, this.size);

    this.renderId = setInterval(() => {
      console.clear();
      console.log(topScroll.next());
      console.log(bottomScroll.next());
    }, this.speed);
  }

  getAndRender() {
    clearInterval(this.renderId);
    axios
      .get(this.address)
      .then(({ data }) => this.render(this.success(data)))
      .catch(() => this.render({ top: "error...", bottom: "retrying..." }));
  }

  init() {
    this.getAndRender();
    setInterval(() => this.getAndRender(), this.pullInterval);
  }
}

const billboard = new Billboard("da82977e-89d8-4232-8d45-8ccddca61095");
billboard.init();
