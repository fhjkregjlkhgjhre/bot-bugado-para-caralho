const mineflayer = require("mineflayer");
const discord = require("discord.js");
const vec3 = require("vec3");
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
const config = require("./config.json");

// minecraft stuff
const client = new discord.Client({autoReconnect: true}); //Caso que o discord se desligue

// bot stuff
client.on("ready", () => {
    console.log("[WORKER] Discord -> ON");
});

const options = {
        host: process.env.ipmine,
        port: 25565,
        version: '1.8.9',
        username: process.env.email,
        password: process.env.password,
};

let minecraft;
function init() {
    console.log("Entrando.");
    minecraft = mineflayer.createBot(options);
}();

function sendchat(ccn){
    minecraft.chat(ccn);
};

client.on('message', msg => {
    if (msg.author.id === client.user.id) return;
    if (msg.content === 'sbafk') {
		hypixelafk();
        	msg.channel.send("Iniciando modo afk");
	} else if (msg.content === 'quit') {
		minecraft.quit();
        	msg.channel.send("Saindo do server");
	} else if (msg.content === "join") {
		init();
        	msg.channel.send("Entrando no server"); 
    } else {
	    console.log(msg.content);
            sendchat(msg.content);
    }
});

minecraft.once('login', () => console.log('logado'));
navigatePlugin(minecraft);

minecraft.on('kicked', function(reason) {
  client.channels.get(config["channel_id"]).send("> Desconectado do server\n" + reason);
});

minecraft.on("message", (chatMsg) => {
    try{
        const msg = chatMsg.toString();
        var canal = client.channels.get('735133986635907113');
        canal.send(msg);
    }catch(e){console.log("ERRO -> ",e)};
});

client.login(process.env.discordkey);
