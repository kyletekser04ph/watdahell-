const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    aliases: ["info","Kyle"],
    author: "Kylepogi", 
    version: "2.0",
    cooldowns: 0,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "get bot owner info"
    },
    category: "owner",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {
      try {
        const loadingMessage = "⏱ 𝙇𝙤𝙖𝙙𝙞𝙣𝙜 𝙥𝙡𝙚𝙖𝙨𝙚 𝙬𝙖𝙞𝙩......";
        await api.sendMessage(loadingMessage, event.threadID);

        const ownerInfo = {
          name: 'Kyle Bait-it',
          gender: '𝖡𝗈𝗒', 
          talent: 'overthinker,Kumain ng gulay,pagiging pogi', 
          sports: 'Soccer, sepak takraw, taekwondo, karate, kick boxing, boxing, etc', 
          hobby: '𝗉𝗅𝖺𝗒𝗂𝗇𝗀 𝗀𝖺𝗆𝖾𝗌, 𝖾𝗍𝖼.',
          relationship: '𝗟𝗶𝗲 𝗔𝗻𝗻',
          facebookLink: 'https://www.facebook.com/kyledev03',
          bio: '𝗳𝘃𝗸 𝗹𝗶𝗳𝗲/𝗮𝘁𝘁𝗶𝘁𝘂𝗱𝗲.'
        };

        const videoUrl = 
["https://i.imgur.com/C8IedFb.mp4"];
        
        const tmpFolderPath = path.join(__dirname, 'tmp');

        if (!fs.existsSync(tmpFolderPath)) {
          fs.mkdirSync(tmpFolderPath);
        }

        const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

        fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

        const response = `
➣ 📜 | 𝗢𝘄𝗻𝗲𝗿 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻 ❏
࿇ ══━━━━✥◈✥━━━━══ ࿇    
 𝗡𝗔𝗠𝗘:${ownerInfo.name}  
 ━━━━━━━━━━━━━━━━━
 👤𝙶𝚎𝚗𝚍𝚎𝚛: ${ownerInfo.gender}
𝙼𝚢 𝚃𝚊𝚕𝚎𝚗𝚝 𝚒𝚜: ${ownerInfo.talent}
𝙼𝚢 𝚜𝚙𝚘𝚛𝚝𝚜 𝚒𝚜:  ${ownerInfo.sports}
 𝙼𝚢 𝚑𝚘𝚋𝚋𝚢 𝚒𝚜: ${ownerInfo.hobby}
 𝚁𝚎𝚕𝚊𝚝𝚒𝚘𝚗𝚜𝚑𝚒𝚙 𝚠𝚒𝚝𝚑: ${ownerInfo.relationship}
  ━━━━━━━━━━━━━━━━━
 𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔 𝙻𝚒𝚗𝚔—[🔗]:${ownerInfo.facebookLink}
  ━━━━━━━━━━━━━━━━━
 𝚖𝚘𝚝𝚝𝚘:${ownerInfo.bio} 
࿇ ══━━━━✥◈✥━━━━══ ࿇
 `;

        await api.sendMessage({
          body: response,
          attachment: fs.createReadStream(videoPath)
        }, event.threadID);
      } catch (error) {
        console.error('Error in owner command:', error);
        api.sendMessage('An error occurred while processing the command.', event.threadID);
      }
    },
    onChat: async function({ api, event }) {
      try {
        const lowerCaseBody = event.body.toLowerCase();

        if (lowerCaseBody === "owner" || lowerCaseBody.startsWith("{p}owner")) {
          await this.onStart({ api, event });
        }
      } catch (error) {
        console.error('Error in onChat function:', error);
      }
    }
  };
