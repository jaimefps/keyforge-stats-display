const j5 = require("johnny-five");
const Poll = require("./libs/poll");
const AdapterLCD = require("./adapters/adapter-lcd");
const TextScroll = require("./libs/text-scroll");

const address =
  "https://decksofkeyforge.com/api/decks/with-synergies/da82977e-89d8-4232-8d45-8ccddca61095";

const board = new j5.Board();
board.on("ready", function () {
  const adapter = new AdapterLCD();
  const display = new TextScroll({ adapter, screenLength: 16 });
  const poll = new Poll({ address, display });
  poll.init();
});
