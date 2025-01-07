module.exports = {
  config: {
    name: "confess",
    aliases: ["confess"],
    version: "1.1", // Updated version
    author: "kylepogi",
    countDown: 5,
    role: 0,
    shortDescription: "Send a message to a specific thread.",
    longDescription: "Send a message to a specific thread using thread ID.",
    category: "box chat",
    guide: "Use: {p}confess <thread-id> <message>", // Updated guide
  },
  onStart: async function ({ api, event, args }) {
    if (args.length < 2) {
      api.sendMessage("Invalid Format. Use: {p}confess <thread/uid> <message>", event.threadID, event.messageID);
      return;
    }

    const idbox = args[0];
    const reason = args.slice(1).join(" ");

    const confessionMessage = `📨 𝗖𝗼𝗻𝗳𝗲𝘀𝘀𝗶𝗼𝗻 𝗧𝗶𝗺𝗲💌\n\n👤Someone Confessed:\n${reason}`;

    api.sendMessage(confessionMessage, idbox, () => {
      const youSentMessage = `📪 *Confession Sent* 📫\n\n💌You Sent:\n\n${reason}`;
      api.sendMessage(`${api.getCurrentUserID()}`, () => {
        api.sendMessage(youSentMessage, event.threadID);
      });
    });
  }
};
