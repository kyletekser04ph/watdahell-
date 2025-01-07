const { getStreamsFromAttachment } = global.utils;
const moment = require("moment-timezone"); // Ensure moment-timezone is included

module.exports = {
	config: {
		name: "notice",
		aliases: ["notif"],
		version: "1.0",
		author: "Kylepogi",
		countDown: 5,
		role: 2,
		shortDescription: "Send notice from admin to all box",
		longDescription: "Send notice from admin to all box",
		category: "owner",
		guide: "{pn} <message>",
		envConfig: {
			delayPerGroup: 250
		}
	},

	onStart: async function ({ message, api, event, args, commandName, envCommands }) {
		const { delayPerGroup } = envCommands[commandName];
		const startTime = Date.now(); // Declare startTime
		const now = moment().tz("Asia/Manila");
		const serverTime = now.format("DD-MMMM-YYYY || hh:mm:ss A");
		
		if (!args[0]) {
			return message.reply("Please enter the message you want to send to all groups.");
		}

		const botPing = Date.now() - startTime; // Calculate bot ping
		const formSend = {
			body: `📬𝗡𝗼𝘁𝗶𝗰𝗲 𝖥𝗋𝗈𝗆 𝗞𝘆𝗹𝗲𝗽𝗼𝗴𝗶\n────────────────\n𝗠𝗲𝘀𝘀𝗮𝗴𝗲: ${args.join(" ")}\n\n📅|⏰ Date and Time: ${serverTime}\n⚡ Bot Ping: ${botPing} ms\nType .callad (your prompt) if you want to respond to this message for admin.`,
			attachment: await getStreamsFromAttachment([
				...(event.attachments || []),
				...(event.messageReply?.attachments || [])
			])
		};

		// Get all group thread IDs
		const allThreadID = (await api.getThreadList(2000, null, ["INBOX"]))
			.filter(item => item.isGroup === true && item.threadID !== event.threadID)
			.map(item => item.threadID);

		message.reply(`Starting to send notices to ${allThreadID.length} chat groups.`);

		let sendSuccess = 0;
		const sendError = [];
		const waitingSend = [];

		// Send messages to each group
		for (const tid of allThreadID) {
			try {
				waitingSend.push({
					threadID: tid,
					pending: api.sendMessage(formSend, tid)
				});
				await new Promise(resolve => setTimeout(resolve, delayPerGroup));
			} catch (e) {
				sendError.push(tid);
			}
		}

		// Wait for all messages to complete
		for (const sent of waitingSend) {
			try {
				await sent.pending;
				sendSuccess++;
			} catch (e) {
				sendError.push(sent.threadID);
			}
		}

		message.reply(`✅ Sent notice to ${sendSuccess} successful group(s).` +
			(sendError.length > 0 ? `\n❌ Failed to send to ${sendError.length} group(s):\n${sendError.join("\n")}` : ""));
	}
};
