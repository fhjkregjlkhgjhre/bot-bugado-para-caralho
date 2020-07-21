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

const mc = mineflayer.createBot({
    host: 'redesky.com',
    port: 25565,
    version: '1.8.9',
    username: "TaNemDFudo",
    //password: process.env.password,
});

client.on('message', msg => {
	if (!msg.author.bot) return;
	console.log(msg.content);
	mc.send(msg.content);
});

bot.once('login', () => console.log('logado'));
navigatePlugin(mc);

/*
mc.once('spawn', () => {
	mineflayerViewer(mc, { port: process.env.PORT });
	console.log(process.env.PORT);
});
*/

mc.on('kicked', function(reason) {
  client.channels.get(config["channel_id"]).send("> Desconectado do server\n" + reason);
});
	  

mc.on("message", (chatMsg) => {
    const msg = chatMsg.toString();
    console.log(msg);
    client.channels.get(config["channel_id"]).send(msg);
});

client.login(process.env.discordkey);
