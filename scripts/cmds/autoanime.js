const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "autoanime",
    version: "6.9",
    author: "Kylepogi",//don't change the author😠
    countDown: 5,
    role: 0,
    shortDescription: "Auto send anime",
    longDescription: "Auto send random anime update",
    category: "seen",
  },
  lastSentMinute: null,
  messageSent: false, // Flag to track if a message has been sent

  onLoad: async function ({ api }) {
    const checkForUpdates = async () => {
      const currentTimePH = moment().tz('Asia/Manila').format('hh:mm A');

      try {
        const filePath = path.join(__dirname, 'schedule.json');
        if (!fs.existsSync(filePath)) {
          console.error("Schedule file not found:", filePath);
          return;
        }

        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const updates = [];
        const currentMinute = moment().tz('Asia/Manila').startOf('minute').format('YYYY-MM-DD HH:mm');

        for (const entry of data) {
          const scheduledTime = moment(entry.time, 'h:mmA').format('hh:mm A');
          if (scheduledTime === currentTimePH) {
            const { animeTitle, episode } = entry;
            updates.push(`✨CURRENT ANIME UPDATE📢\nAnime: ${animeTitle}\nEpisode: ${episode}\nTime: ${scheduledTime}`);
          }
        }

        if (updates.length > 0 && (!this.messageSent || this.lastSentMinute !== currentMinute)) {
          const message = updates.join('\n\n');
          
          // Send the message to all threads
          const threadIDs = global.db.allThreadData.map(thread => thread.threadID);
          threadIDs.forEach(threadID => {
            api.sendMessage(message, threadID);
          });

          console.log("Anime update message sent successfully!");
          this.messageSent = true;
          this.lastSentMinute = currentMinute;
        } else if (updates.length === 0) {
          this.messageSent = false; // Reset the flag if no updates
        }
      } catch (error) {
        console.error("Error reading schedule data:", error);
      }
    };

    // Run the update check every minute
    setInterval(checkForUpdates, 60000); // 1 minute interval
    await checkForUpdates(); // Perform an initial update check immediately
  },

  onStart: function () {
    console.log(`${this.config.name} module started!`);
  },
};
