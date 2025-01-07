const { getTime, drive } = global.utils;
const fs = require('fs');
const path = require('path');
const os = require('os');
const moment = require('moment-timezone');
const cron = require('node-cron');

module.exports = {
  config: {
    name: "leave",
    version: "1.4",
    author: "kylepogi",
    category: "events",
  },

  langs: {
    en: {
      session1: "morning",
      session2: "noon",
      session3: "afternoon",
      session4: "evening",
      leaveType1: "left",
      leaveType2: "was kicked from",
      defaultLeaveMessage:
        "Goodbye {userNameTag} \nℹ️ Reason: {type} the group.\n\n📅|⏰Date and Time:\n{serverTime}\n⚡Bot Ping: {botPing} ms\n\nHave a nice {session} 😗",
    },
  },

  onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {
    if (event.logMessageType === "log:unsubscribe") {
      try {
        const now = moment().tz("Asia/Manila");
        const serverTime = now.format("DD-MMMM-YYYY || hh:mm:ss A");
        
        const startTime = Date.now(); // Capture the start time
        const { threadID } = event;
        const threadData = await threadsData.get(threadID);

        // Ensure threadData exists
        if (!threadData || !threadData.settings?.sendLeaveMessage) return;

        const { leftParticipantFbId } = event.logMessageData;
        if (leftParticipantFbId === api.getCurrentUserID()) return;

        const hours = parseInt(getTime("HH"), 10);
        const threadName = threadData.threadName || "this group";
        const userName = await usersData.getName(leftParticipantFbId);

        let { leaveMessage = getLang("defaultLeaveMessage") } = threadData.data;

        const session = hours <= 10
          ? getLang("session1")
          : hours <= 12
          ? getLang("session2")
          : hours <= 18
          ? getLang("session3")
          : getLang("session4");

        leaveMessage = leaveMessage
          .replace(/\{userName\}|\{userNameTag\}/g, userName)
          .replace(/\{type\}/g, leftParticipantFbId === event.author ? getLang("leaveType1") : getLang("leaveType2"))
          .replace(/\{threadName\}|\{boxName\}/g, threadName)
          .replace(/\{time\}/g, hours)
          .replace(/\{session\}/g, session)
          .replace(/\{serverTime\}/g, serverTime);

        const endTime = Date.now(); // Capture end time
        const botPing = endTime - startTime; // Calculate bot ping

        leaveMessage = leaveMessage.replace(/\{botPing\}/g, botPing); // Replace botPing in the message

        const form = {
          body: leaveMessage,
          mentions: leaveMessage.includes("{userNameTag}")
            ? [{ id: leftParticipantFbId, tag: userName }]
            : null,
        };

        if (threadData.data.leaveAttachment) {
          const attachments = threadData.data.leaveAttachment.map((file) => drive.getFile(file, "stream"));
          const resolvedAttachments = await Promise.allSettled(attachments);
          form.attachment = resolvedAttachments
            .filter(({ status }) => status === "fulfilled")
            .map(({ value }) => value);
        }

        // Send the message
        message.send(form);

      } catch (error) {
        console.error("Error handling leave message:", error);
      }
    }
  },
};
