const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

// map holding {title, user}
let comboMap = new Map(); 

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {
    getUserRequest();
    alertUserWhenRequestIsComplete();

    /* Map contents:
        comboMap.entries() == { title, user }
        currentEntry[0] == title
        currentEntry[1] == user
    */
});

function getUserRequest() {
    // no longer has to check for movie vs. tv requests. uses the Mellowbot confirmation to get exact title
    if (message.author.username == "Mellow" && message.content.includes("Requested")) {
        user = message.content.split(",");   
        user = user[0];
        startIndex = message.content.indexOf(",");
        title = message.content.slice(startIndex + 12, -9);

        comboMap.set(title, user);
        console.log(user + " has requested " + title);
        // message.channel.send(user + " has requested " + title);
    }
}

function alertUserWhenRequestIsComplete() {
    // if the message is sent by the Plex webhook  
    // iterate through the map entries and check if the Plex message starts with a title in the map
    // if so, get the user who requested that title, then tell them their request is complete
    if (message.author.username == "Plex") {
        for (currentEntry of comboMap.entries()) {
            if (message.content.startsWith(currentEntry[0])) {
                message.channel.send("Hey " + currentEntry[1] + "! Your request is complete. " + currentEntry[0] + " is now available!");
                console.log("Hey " + currentEntry[1] + "! Your request is complete. " + currentEntry[0] + " is now available!");
                // comboMap.delete(currentEntry)  // remove key/value pair after the movie is added
            }
        }
    }
}

client.login(config.token);