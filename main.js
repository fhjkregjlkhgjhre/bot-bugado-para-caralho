const mineflayer = require("mineflayer");
const discord = require("discord.js");
const vec3 = require("vec3");
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
const mineflayerViewer = require('prismarine-viewer').mineflayer;
const config = require("./config.json");
const prefix = "-"

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
function createBot() {
    console.log("Entrando...");
    minecraft = mineflayer.createBot(options);
};

navigatePlugin(minecraft);

function sendchat(ccn){
    minecraft.chat(ccn);
};

function hypixelafk(){
    sendchat("/play sb");
    const directions = vec3(0,0,0);
    minecraft.navigate.to(directions);
};

client.on('message', msg => {
    if (msg.author.id === client.user.id) return;
    if (msg.content === "starthypixelafk"){
        hypixelafk();
        msg.channel.send("Iniciando modo afk");
    }
    else {
        sendchat(msg.content);
    }
    //const minecraft = minecraft
    //minecraft.send(msg.content);
});

minecraft.on('kicked', function(reason) {
  client.channels.get(config["channel_id"]).send("> Kicado do server\n" + reason);
});

minecraft.on("message", (chatMsg) => {
    try{
        const msg = chatMsg.toString();
        var canal = client.channels.get('735133986635907113');
        canal.send(msg);
    }catch(e){console.log("ERRO -> ",e)};
});

client.login(process.env.discordkey);
