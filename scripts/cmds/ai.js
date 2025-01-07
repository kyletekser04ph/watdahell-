const axios = require('axios');
const UPoLPrefix = [
  '.ai',
  'ai',
  'Ai',
  'bot',
  'ask'
]; 

  module.exports = {
  config: {
    name: 'ai',
    version: '1.2.1',
    role: 0,
    category: 'AI',
    author: 'Kylepogi',
    shortDescription: '',
    longDescription: '',
  },
  
  onStart: async function () {},
  onChat: async function ({ message, event, args, api, threadID, messageID }) {
      
      const ahprefix = UPoLPrefix.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!ahprefix) {
        return; 
      } 
      
     const upol = event.body.substring(ahprefix.length).trim();
   if (!upol) {
        await message.reply('Missing question:)');
        return;
      }
      
      const apply = ['Hi I am 𝗭𝗲𝗽𝗵𝘆𝗿𝘂𝘀 Bot how can I help you today?', 'How can i help you?', 'How can i assist you today?', 'How can i help you?🙂'];
      
     const randomapply = apply[Math.floor(Math.random() * apply.length)];

     
      if (args[0] === 'hi') {
          message.reply(`${randomapply}`);
          return;
      }
      
    const encodedPrompt = encodeURIComponent(args.join(" "));

   await message.reply('🔍searching.....');
  
    const response = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodedPrompt}`);
 
     const UPoL = response.data.answer; 

      const upolres = `[𓃵] -> 𝗞𝗬𝗟𝗘'𝗦 𝗚𝗣𝗧:\n──────────────────\n${UPoL}`;
      
        message.reply(upolres);
  }
};
