const mineflayer = require("mineflayer");
const discord = require("discord.js");
const vec3 = require("vec3");
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
const mineflayerViewer = require('prismarine-viewer').mineflayer;
const config = require("./config.json");

// minecraft stuff
const client = new discord.Client({autoReconnect: true}); //Caso que o discord se desligue
const mc = mineflayer.createBot({
    host: 'redesky.com',
    port: 25565,
    version: '1.8.9',
    username: "TaNemDFudo",
    //password: process.env.password,
});

navigatePlugin(mc);

(function init() {
    console.log("[WORKER] Minecraft -> Iniciando sessão na conta");
    mc._client.once("session", session => options.session = session);
    mc.once("end", () => {
        setTimeout(() => {
	    console.log("Falhou ao entrar no server, reconenctando");
            init();
        }, 60000);
    });
}());

let uuid;
let name;
mc.on("login", () => {
    //uuid = mc._client.session.selectedProfile.id;
    //name = mc._client.session.selectedProfile.name;
    setTimeout(() => {
    	console.log("[WORKER] Minecraft -> Ligação completa ao server")
    }, 1000);
    
});	

mc.once('spawn', () => {
	mineflayerViewer(mc, { port: process.env.PORT });
	console.log(process.env.PORT);
});

mc.on('kicked', function(reason) {
  client.channels.get(config["channel_id"]).send("> Desconectado do server\n" + reason);
});
	  

// bot stuff
client.on("ready", () => {
    console.log("[WORKER] Discord -> ON");
});

client.on("message", (message) => {
	if (!message.author.bot) return;
	console.log(message.content);
	mc.send(message.content);
});

mc.on("message", (chatMsg) => {
    const msg = chatMsg.toString();
    console.log(msg);
    client.channels.get(config["channel_id"]).send(msg);
});

client.login(process.env.discordkey);
