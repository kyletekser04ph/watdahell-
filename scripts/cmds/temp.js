const { TempMail } = require("1secmail-api");

function generateRandomId() {
    const length = 6;
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < length; i++) {
        randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomId;
}

module.exports.config = {
    name: "tempmail",
    aliases: ["temp"],
    version: "1.0",
    author: "kylepogi",
    role: 0,
    shortDescription: "generate email",
    longDescription: "Get Random email",
    category: "email",
    guide: "[tempmail]"
};

module.exports.run = async function ({ api, event }) {
    const reply = (msg) => api.sendMessage(msg, event.threadID, event.messageID);

    try {
        // Generate temporary email
        const mail = new TempMail(generateRandomId());

        // Auto fetch
        mail.autoFetch();

        reply("Your temporary email: " + mail.address);

        // Fetch function
        const fetch = async () => {
            const mails = await mail.getMail();
            if (!mails[0]) {
                return;
            }

            const b = mails[0];
            const msg = `📨You have a 𝗺𝗲𝘀𝘀𝗮𝗴𝗲!\n\n📩From: ${b.from}\n\n📋Subject: ${b.subject}\n\n📬Message: ${b.textBody}\n📆Date: ${b.date}`;
            reply(msg + `\n\nOnce the email and message are received, they will be automatically deleted.`);
            await mail.deleteMail();
        };

        // Auto fetch every 3 seconds
        setInterval(fetch, 3 * 1000);
    } catch (err) {
        console.log(err);
        return reply(err.message);
    }
};
