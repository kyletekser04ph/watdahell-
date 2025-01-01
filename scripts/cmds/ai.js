const axios = require('axios');
const moment = require("moment-timezone");
const manilaTime = moment.tz('Asia/Manila');
const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');

const Prefixes = [
  'gpt',
  'ai',
  'Robot',
  'bot',
'Zephyrus', 
];

module.exports = {
  config: {
    name: 'ai',
    version: '2.5.4',
    author: 'Kylepogi',//credits owner of this api
    role: 0,
    category: 'ai',
    shortDescription: {
      en: 'Asks an AI for an answer.',
    },
    longDescription: {
      en: 'Asks an AI for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },

  langs: {
    en: {
      final: "𝗞𝗬𝗟𝗘'𝗦 𝗕𝗢𝗧 ",
      loading: "⏳ 𝘱𝘭𝘦𝘢𝘴𝘦 𝘸𝘢𝘪𝘵..."
    }
  },

  onStart: async function () {},

  onChat: async function ({ api, event, args, getLang, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return;
      }

      const prompt = event.body.substring(prefix.length).trim();

      if (prompt === '') {

        await message.reply(
          "𝖧𝖾𝗅𝗅𝗈 𝖨'𝗆 𝗞𝘆𝗹𝗲'𝘀 𝗕𝗼𝘁 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇𝗌\n\nℹ️ 𝗲𝘅𝗮𝗺𝗽𝗹𝗲: ai what is handsome"  
        );
        
        return;
      }

      const loadingMessage = getLang("loading");
      const loadingReply = await message.reply(loadingMessage);
      const url = "https://hercai.onrender.com/v3/hercai"; // Replace with the new API endpoint
      const response = await axios.get(`${url}?question=${encodeURIComponent(prompt)}`);

      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }

      const messageText = response.data.reply.trim(); // Adjust according to the response structure of the new API
      const userName = getLang("final");
      const finalMsg = `${userName}\n━━━━━━━━━━━━━━━━━━━\n╭┈ ❒ 💁🏻‍♂️ -𝗮𝗻𝘀𝘄𝗲𝗿: \n╰┈➤${messageText}\n━━━━━━━━━━━━━━━━━━━`;
      api.editMessage(finalMsg, loadingReply.messageID);

      console.log('Sent answer as a reply to user');
    } catch (error) {
      console.error(`Failed to get answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
        event.threadID
      );
    }
  },
};
