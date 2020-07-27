module.exports = class TextScroll {
  constructor({ adapter, screenLength }) {
    this.next = this.next.bind(this);

    this.screenLength = screenLength;
    this.speed = 200;
    this.adapter = adapter;
    this.locations = [];
  }

  next(text, idx) {
    const currLocation = this.locations[idx];
    let chunk = text.slice(currLocation, currLocation + this.screenLength);
    this.locations[idx] = currLocation < text.length ? currLocation + 1 : 0;

    while (chunk.length < this.screenLength) {
      chunk = chunk + text.slice(0, this.screenLength - chunk.length);
    }

    return chunk;
  }

  render(rows) {
    // setup locations state:
    rows.forEach(() => this.locations.push(0));

    setInterval(() => {
      this.adapter.handle(rows.map(this.next));
    }, this.speed);
  }
};
