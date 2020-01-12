const Discord = require("discord.js");
const client = new Discord.Client();
// let hook = new Discord.WebhookClient('665298340178821155', 'oSD6h7znBk7BAg4G3Y28iw_XMTh-xMp8z1Vj6BwTBQ4jC_rEXaKwqk7LhY6C6WAavcdK');
let comboMap = new Map(); // map holding {title, user}
var title; // title of the movie or tv show
var user; // user making the request

client.on("ready", () => {
    console.log("I am ready!");
    // client.user.setStatus('invisible');
});

client.on("message", (message) => {

    // catch the inital request and store the movie title and requesting user
    if (message.content.startsWith("request movie")) {
        title = message.content.substr(14, message.content.length);
        user = message.author;

        console.log(user.username + " has requested " + title.toLowerCase());
        comboMap.set(title.toLowerCase(), user);
    }

    // catch the inital request and store the tv title and requesting user
    if (message.content.startsWith("request tv")) {
        title = message.content.substr(11, message.content.length);
        user = message.author;

        console.log(user.username + " has requested " + title.toLowerCase());
        comboMap.set(title.toLowerCase(), user);
    }

    // if the message is sent by the Plex webhook (to immediately rule out most messages), 
    // iterate through the map entries and check if the Plex message starts with a title in the map
    // if so, get the user who requested that title, then tell them their request is complete
    if (message.author.username == "Plex") {
        for (currentEntry of comboMap.entries()) {
            if (message.content.toLowerCase().startsWith(currentEntry[0])) {
                message.channel.send(currentEntry[1] + " Your request is complete.");
                // comboMap.delete(currentEntry)  // remove key/value pair after the movie is added
            }
        }
    }
    // comboMap.entries() == { title, user }
    // currentEntry[0] == title
    // currentEntry[1] == user
});

client.login("NjY1MjczMDQwOTk2Nzk0MzY5.XhjPOw.FdrqWc1s_zqydQAFXVe_xq-U8os");