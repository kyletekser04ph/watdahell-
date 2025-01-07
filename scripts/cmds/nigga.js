module.exports = {

  config: {

    name: "randomnigga",

    aliases: ["niga", "nigga"],

    version: "1.0.1",

    author: "Kaizenji",

    role: 0,
    
    countDown: 2,

    shortDescription: {

      en: "Random nigga meme"

    },

    longDescription: {

      en: "Sends Random Humor of blakniqqa"

    },

    category: "fun",

    guide: {

      en: "Use {p} randomnigga"

    }

  },


  onStart: async function ({ api, event, args }) {


    const imageLinks = [


 "https://i.imgur.com/4RL3H5Y.mp4",

"https://i.imgur.com/sSlHTYE.mp4",

"https://i.imgur.com/LchCI6K.mp4",

"https://i.imgur.com/5TmQ53N.mp4",

"https://i.imgur.com/KRxR8u3.mp4",

"https://i.imgur.com/7AHX9zo.mp4",

"https://i.imgur.com/culB9fs.mp4",

"https://i.imgur.com/kKeWD2N.mp4",

"https://i.imgur.com/0Ab6B9u.mp4",

"https://i.imgur.com/Q0mihZn.mp4",

"https://i.imgur.com/O9B1gCy.mp4",

"https://i.imgur.com/ltwDdfQ.mp4",

"https://i.imgur.com/5O9z54h.mp4",

"https://i.imgur.com/JPlIyGF.mp4",

"https://i.imgur.com/1lci268.mp4",

"https://i.imgur.com/EIp96G4.mp4",

"https://i.imgur.com/Bos2DqL.mp4",

"https://i.imgur.com/PRwSz2N.mp4",

"https://i.imgur.com/oLXjHfR.mp4",

"https://i.imgur.com/lVlmx1y.mp4",

"https://i.imgur.com/IVl4E1g.mp4",

"https://i.imgur.com/OY1ORHE.mp4",

"https://i.imgur.com/aDfvnve.mp4",

"https://i.imgur.com/74bGSjF.mp4",

"https://i.imgur.com/KgiqIm6.mp4",

"https://i.imgur.com/JVs4vmQ.mp4",

"https://i.imgur.com/jTpmlMd.mp4",


    ];



    const randomImageIndex = Math.floor(Math.random() * imageLinks.length);

    const imageUrl = imageLinks[randomImageIndex];


const greetings = [


"wow maayong gabi mga rill kneegas pangaon na kamo‼🗣",

"simoy ng hangin na dumadampi sa buhok mo nagsasabing mahal mo rin ako...",

"gusto kong manood ng bidyo ng mga itim na lalaki na nag kukulitan sa aking sofa",

"nigga whutt?!",

"ginger = nigger",

"niggero",

"negros occidental",

"wao maayong buntag reel kneegas 🗣‼",

"Puwit nila sobrang malalaki Pwede ba akong umiyot ng lalaki? Yung maitim at nagsha-shake yung pwit Upuan mo ako sa mukha my nigg- Ang sasarap ng mga black na lalaki Mas masarap sila kaysa babae Lagyan ng oil ang booty niya na grabe Ang hot nila sobra oh pare",

"bruh wutdahel bro",

"ambatuuuuukaammmmmmmoghhhhhh",

"wao booty cheekz",

"lolbakladilaanmomunabetlogko",

"makinis at maitim madulas at malaki yan ang aking booty cheekz🤫🧏🏾",

"bugtong bugtong malaking bundok na maitim",

"look at my bootycheekz🥵",

"The Crushing⁉",

"hehehehehehe",

"wohoiiiii",

"sakanigadik"



   ];

    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];


    const message = `Random nigga memes:\n\n${randomGreeting}`;


    

    const imageStream = await global.utils.getStreamFromURL(imageUrl);


    api.sendMessage({

      body: message,

      attachment: imageStream

    }, event.threadID, event.messageID);

  }


};
