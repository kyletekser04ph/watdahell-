const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent) global.temp.welcomeEvent = {};
const fs = require('fs');
const path = require('path');
const os = require('os');
const moment = require('moment-timezone');
const cron = require('node-cron');

module.exports = {
  config: {
    name: "welcome",
    version: "1.9",
    author: "kylepogi",
    category: "events",
  },

  langs: {
    en: {
      session1: "morning",
      session2: "noon",
      session3: "afternoon",
      session4: "evening",
      welcomeMessage:
        "🔴🟠🟡🟢 𝗞𝘆𝗹𝗲'𝘀 𝗕𝗼𝘁 𝗰𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆!!\nThank you for inviting me to the group!\nBot prefix: %1\nTo view the list of commands, please enter: %1help\n\n=======[ owner: Kylepogi ] =======",
      multiple1: "you",
      multiple2: "you guys",
      defaultWelcomeMessage: `Hello {userNameTag}.\nWelcome {multiple} to the chat group: {boxName}\n\n📅|⏰ Date and Time:\n{serverTime}\n⚡ Bot Ping: {botPing} ms\n\nHave a nice {session} (≡^∇^≡)`,
    },
  },

  onStart: async ({ threadsData, message, event, api, getLang, usersData }) => {
    if (event.logMessageType === "log:subscribe") {
      const addedParticipants = event.logMessageData.addedParticipants || [];
      const startTime = Date.now();
      const now = moment().tz("Asia/Manila");
      const serverTime = now.format("DD-MMMM-YYYY || hh:mm:ss A");
      const hours = parseInt(now.format("HH"), 10);
      const session =
        hours <= 10
          ? getLang("session1")
          : hours <= 12
          ? getLang("session2")
          : hours <= 18
          ? getLang("session3")
          : getLang("session4");
      const endTime = Date.now();
      const botPing = endTime - startTime;

      const { threadID } = event;
      const { nickNameBot } = global.GoatBot.config;
      const prefix = global.utils.getPrefix(threadID);

      // If the bot is added to the group
      if (addedParticipants.some((user) => user.userFbId === api.getCurrentUserID())) {
        if (nickNameBot) {
          api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
        }
        return message.send(getLang("welcomeMessage", prefix));
      }

      if (!global.temp.welcomeEvent[threadID]) {
        global.temp.welcomeEvent[threadID] = {
          joinTimeout: null,
          dataAddedParticipants: [],
        };
      }

      global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...addedParticipants);

      clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

      global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async () => {
        const threadData = await threadsData.get(threadID);
        if (!threadData.settings?.sendWelcomeMessage) return;

        const addedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
        const dataBanned = threadData.data.banned_ban || [];
        const threadName = threadData.threadName || "this group";
        const userName = [];
        const mentions = [];
        const multiple = addedParticipants.length > 1;

        for (const user of addedParticipants) {
          if (dataBanned.some((bannedUser) => bannedUser.id === user.userFbId)) continue;
          userName.push(user.fullName);
          mentions.push({
            tag: user.fullName,
            id: user.userFbId,
          });
        }

        if (userName.length === 0) return;

        let { welcomeMessage = getLang("defaultWelcomeMessage") } = threadData.data;

        welcomeMessage = welcomeMessage
          .replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
          .replace(/\{boxName\}|\{threadName\}/g, threadName)
          .replace(/\{multiple\}/g, multiple ? getLang("multiple2") : getLang("multiple1"))
          .replace(/\{session\}/g, session)
          .replace(/\{serverTime\}/g, serverTime)
          .replace(/\{botPing\}/g, botPing);

        const form = {
          body: welcomeMessage,
          mentions: mentions.length > 0 ? mentions : null,
        };

        if (threadData.data.welcomeAttachment) {
          const attachments = threadData.data.welcomeAttachment.map((file) =>
            drive.getFile(file, "stream")
          );
          const resolvedAttachments = await Promise.allSettled(attachments);
          form.attachment = resolvedAttachments
            .filter(({ status }) => status === "fulfilled")
            .map(({ value }) => value);
        }

        message.send(form);
        delete global.temp.welcomeEvent[threadID];
      }, 1500);
    }
  },
};
