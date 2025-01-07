const moment = require("moment-timezone");
const birthdayFacts = [
    "A year older, a year bolder.","Another year, another reason to celebrate.","On your special day, may all your dreams come true.","Age is merely the number of years the world has been enjoying you.","You are not getting older, you are getting better.","Wishing you a day filled with love, laughter, and special memories.","Life is a journey, and today marks another wonderful year on that journey.","May this year be filled with joy, laughter, and all the happiness you deserve.","Here's to another year of adventures, laughter, and new memories.","Happy birthday! May this year be the best one yet, filled with love, joy, and exciting surprises."
];

module.exports = {
    config: {
        name: "bday",
        version: "1.0",
        author: "Kylepogi",//don't change the author nigga kung ayaw mong ma pwetan tamo own gawa ko to. 
        countDown: 5,
        role: 0,
        shortDescription: "birthday🎂🎉",
        longDescription: "Owner/Admin/boss birthday command",
        category: "birthday 🎉",
    },
    onStart: async function() {},
    onChat: async function({ event, message, getLang }) {
        const manilaTime = moment.tz('Asia/Manila');
        const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');
        
        if (event.body && event.body.toLowerCase() === "bday") {
            const randomFact = birthdayFacts[Math.floor(Math.random() * birthdayFacts.length)];
 const t = Date.parse("June18, 2025, 00:00:00") - Date.parse(new Date());
		const seconds = Math.floor( (t/1000) % 60 );
		const minutes = Math.floor( (t/1000/60) % 60 );
		const hours = Math.floor( (t/(1000*60*60)) % 24 );
		const days = Math.floor( t/(1000*60*60*24) );
      
            return message.reply({
                body: `❖ ── ✦ ──『✙』── ✦ ── ❖\n🎉🎂𝗥𝗘𝗠𝗔𝗜𝗡𝗜𝗡𝗚 𝗗𝗔𝗬𝗦 𝗙𝗢𝗥 𝗺𝘆  𝗯𝗼𝘀𝘀: 𝗞𝘆𝗹𝗲敦. ဗီူ(𝗞𝘆𝗹𝗲 𝗕𝗮𝗶𝘁-𝗶𝘁)\n━━━━━━━━━━━━━━━━━━\n𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆 𝗖𝗼𝘂𝗻𝘁𝗱𝗼𝘄𝗻» ${days} 𝗱𝗮𝘆𝘀 ${hours} 𝗵𝗼𝘂𝗿𝘀 ${minutes} 𝗺𝗶𝗻𝘂𝘁𝗲𝘀 ${seconds} 𝘀𝗲𝗰𝗼𝗻𝗱𝘀
━━━━━━━━━━━━━━━━━━
    📅 | ⏰ Date And Time: 
     ${formattedDateTime} 
━━━━━━━━━━━━━━━━━━
🎉𝗕𝗜𝗥𝗧𝗛𝗗𝗔𝗬 𝗙𝗔𝗖𝗧: ${randomFact}\n❖ ── ✦ ──『✙』── ✦ ── ❖`,
            });
        }
    }
};
