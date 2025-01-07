const axios = require("axios");

module.exports = {
  config: {
    name: "autoextract",
    version: "1.0",
    author: "kylepogi",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "Tools 🛠️",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event, args }) {
    // Any initial actions or checks can be performed here when the bot starts
  },

  onChat: async function ({ api, event, args }) {
    if (args.length !== 1) {
      return; // Exit if there is not exactly one argument
    }

    const url = args[0];
    try {
      const response = await axios.get(url);
      console.log("Response from Axios:", response.data); // Logging the response data
      api.sendMessage(response.data, event.threadID);
    } catch (error) {
      console.error("Error fetching content:", error.message); // Logging error message
      // Instead of sending a message, handle the error silently (without a reply)
    }
  },
};
