const mineflayer = require("mineflayer");
const discord = require("discord.js");
var v = require("vec3");
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
const config = require("./config.json");

// minecraft stuff
const client = new discord.Client({autoReconnect: true}); //Caso que o discord se desligue

// bot stuff
client.on("ready", () => {
    console.log("[WORKER] Discord -> ON");
});

const minecraft = mineflayer.createBot({
            host: process.env.ipmine,
            port: 25565,
            version: '1.8.9',
            username: process.env.email,
            password: process.env.password,
});

function hypixelafk(){
	minecraft.chat("/play sb");
	const coords = v(43, 64, 175);
	minecraft.navigate.walk(coords);
};

client.on('message', msg => {
    if (msg.author.id === client.user.id) return;
    if (msg.content === 'sbafk') {
        hypixelafk();
            msg.channel.send("Iniciando modo afk");
    }else {
        console.log(msg.content);
            minecraft.chat(msg.content);
    }
});

minecraft.on('login', () => console.log('logado'));
navigatePlugin(minecraft);

minecraft.on('kicked', function(reason) {
  client.channels.get(config["channel_id"]).send("> Desconectado do server\n" + reason);
});

minecraft.on("message", (chatMsg) => {
    try{
	var canal = client.channels.get('735133986635907113');
	const msg = chatMsg.toString();
	canal.send(msg);
    }catch(e){console.log("ERRO -> ",e)};
});
/*
remind to check the notes 
*/

client.login(process.env.discordkey);
