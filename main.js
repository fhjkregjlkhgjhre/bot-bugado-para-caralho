const mineflayer = require("mineflayer");
const discord = require("discord.js");
const vec3 = require("vec3");
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
const mineflayerViewer = require('prismarine-viewer').mineflayer;
const config = require("./config.json");

// minecraft stuff
const client = new discord.Client({autoReconnect: true}); //Caso que o discord se desligue

// bot stuff
client.on("ready", () => {
    console.log("[WORKER] Discord -> ON");
});

const options = {
    host: 'comeeu.mcserv.me',
    port: 25565,
    version: '1.8.9',
    username: "TaNemDFudo",
    //password: process.env.password,
};

let minecraft;
(function init() {
    console.log("Logging in.");
    minecraft = mineflayer.createBot(options);
    //minecraft._client.once("session", session => options.session = session);
    minecraft.once("end", () => {
        setTimeout(() => {
            console.log("Conecção falhada...");
            init();
        }, 60000);
    });
}());

let uuid;
let name;
minecraft.on("login", () => {
    //uuid = mc._client.session.selectedProfile.id;
    //name = mc._client.session.selectedProfile.name;
    setTimeout(() => {
        console.log("Bot on.");
    }, 1000);
});


function sendchat(ccn){
    minecraft.chat(ccn);
}

client.on('message', msg => {
    if (msg.author.id === client.user.id) return; 
    if (msg.content.indexOf(config.prefix) !== 0) return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    if (command == "vai-para"){
        const pt = vec3(
            parseFloat(args[1], 10),
            parseFloat(args[2], 10),
            parseFloat(args[3], 10)
        )
        bot.navigate.to(pt);
    }
    if (!command == "vai-para"){
        sendchat(msg.content);   
    }
    //const minecraft = minecraft
    //minecraft.send(msg.content);
});

navigatePlugin(minecraft);

minecraft.once('spawn', () => {
    mineflayerViewer(minecraft, { port: process.env.PORT });
    console.log(process.env.PORT);
});

minecraft.on('kicked', function(reason) {
  client.channels.get(config["channel_id"]).send("> Desconectado do server\n" + reason);
  init();
});
      

minecraft.on("message", (chatMsg) => {
    try{
        const msg = chatMsg.toString();
        var canal = client.channels.get('735133986635907113');
        canal.send(msg);
    }catch(e){console.log("ERRO -> ",e)};
});

client.login(process.env.discordkey);
