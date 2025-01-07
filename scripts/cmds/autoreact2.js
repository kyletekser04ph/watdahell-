const emojiRegex = require("emoji-regex");
module.exports = {
  config: {
    name: 'autoreact2',
    author: '@',
    countDown: 5,
    role: 0,
    category: 'owner',
    shortDescription: { en: "Reacts to emoji with same emoji!" }
  },
  onStart: async function() {},
  onChat: async function({ event, api, message }) {
    const { body, messageID, threadID } = event;
    const emojis = body.match(emojiRegex());
    if (emojis) {
      for (const emoji of emojis) {
        await api.setMessageReaction(emoji, messageID, threadID, api);
      }
    }
  }
};
