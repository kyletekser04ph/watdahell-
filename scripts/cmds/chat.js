const { GoatWrapper } = require('fca-liane-utils');
const axios = require('axios');
global.zenLeaf = {};

module.exports = {
    config: {
        name: "chat",
        version: "1.0",
        description: "Command to turn on/off chat",
        guide: {
            en: "Turn on/off chat"
        },
        category: "box chat",
        countDown: 5,
        role: 0,
        author: "kylepogi",
    },
    
    langs: {
        en: {
            "onlyAdmin": "⛔ 𝗔𝗖𝗖𝗘𝗦𝗦 𝗗𝗘𝗡𝗜𝗘𝗗\n▬▬▬▬▬▬▬▬▬▬▬▬\nYou do not have permission to use this command!!"
        }
    },

    onStart: async function ({ message, args, role, getLang, event }) {
        if (args[0] === "on") {
            if (role < 1) {
                return message.reply(getLang("onlyAdmin")); 
            }
            
            const threadID = event.threadID; 
            global.zenLeaf[threadID] = global.zenLeaf[threadID] || {};
            global.zenLeaf[threadID].chatEnabled = true;
            message.reply("⚠️ 𝗖𝗵𝗮𝘁 𝗼𝗳𝗳 𝗶𝘀 𝗻𝗼𝘄 𝗱𝗶𝘀𝗮𝗯𝗹𝗲𝗱.\n▬▬▬▬▬▬▬▬▬▬▬\n💁🏻‍♂️ Members can now freely chat.");
        } else if (args[0] === "off") {
            if (role < 1) {
                return message.reply(getLang("onlyAdmin")); 
            }
            
            const threadID = event.threadID; 
            global.zenLeaf[threadID] = global.zenLeaf[threadID] || {};
            global.zenLeaf[threadID].chatEnabled = false;
            message.reply("Chat off enabled. Members who chat will be kicked.");
        }
    },

    onChat: async function ({ message, event, api, getLang, role }) {
        const threadID = event.threadID; 
        const chatEnabled = global.zenLeaf[threadID]?.chatEnabled ?? true;

        if (!chatEnabled) {
            if (role < 1) {
                // Kick user if chat is disabled
                api.removeUserFromGroup(event.senderID, threadID, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                message.reply("⚠️ 𝗖𝗛𝗔𝗧 𝗗𝗘𝗧𝗘𝗖𝗧𝗘𝗗\n▬▬▬▬▬▬▬▬▬▬▬▬\n💁🏻‍♂️ The group is currently on chat off, You have been kicked from the group💀");
            }
        }
    }
};
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true }); 
