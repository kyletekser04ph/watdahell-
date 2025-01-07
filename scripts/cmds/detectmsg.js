const { config } = global.GoatBot;

// Define an array of target messages in lowercase
const targetMessages = ["lance cochangco", "kyle", "kylepogi", "pastebin.com", "replit.com", "github.com"];

module.exports = {
  config: {
    name: "detectmsg",
    aliases: ["detectmessage"],
    version: 1.0,
    author: "Liane/Lance Ajiro", // mod by Lance Ajiro 
    countDown: 5,
    role: 0,
    shortDescription: { en: "Detect a target message" },
    longDescription: { en: "Detect a target message in a thread" },
    category: "Info",
    guide: { en: "{pn}" }
  },
  onStart: async function ({ api, args, message, event, usersData }) {
    const data = await usersData.get(event.senderID);
    const name = data.name;
    message.reply(`This command will help you detect the target message from the group chat that the bot is in.`);
  },
  onChat: async function ({ api, args, message, usersData, threadsData, event }) {
    const data = await usersData.get(event.senderID);
    const name = data.name;
    const thread = await threadsData.get(event.threadID);
    const threadName = thread.threadName;

    const chat = event.body.toLowerCase(); // Convert the incoming message to lowercase

    // Check if the incoming message contains any target message
    if (targetMessages.some(target => chat.includes(target.toLowerCase()))) {
        for (const adminID of config.adminBot) {
            api.sendMessage(`⚠ Target Message Detected:
» From: ${name}
» UID: ${event.senderID}
» Thread: ${threadName}
» TID: ${event.threadID}
📥 Message:
${event.body}`, adminID);
        }
    }
  }
};
