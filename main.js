const mineflayer = require("mineflayer");
const discord = require("discord.js");
const vec3 = require("vec3")
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
const mineflayerViewer = require('prismarine-viewer').mineflayer;
const config = require("./config.json");
const prefix = "/"

// minecraft stuff
const client = new discord.Client({autoReconnect: true}); //Caso que o discord se desligue
const options = {
    host: 'redesky.com',
    port: 25565,
    version: '1.8.9',
    username: "TaNemDFudo",
    //password: process.env.password,
};

let mc;
(function init() {
    console.log("[WORKER] Minecraft -> Iniciando sessão na conta");
    mc = mineflayer.createBot(options);
    navigatePlugin(mc);
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
  mineflayerViewer(bot, { port: 3007 })
});

mc.on('kicked', function(reason) {
  client.channels.get(config["channel_id"]).send("> Desconectado do server\n" + reason);
});
	  
mc.on("message", (chatMsg) => {
    const msg = chatMsg.toString();
    console.log(msg);
    client.channels.get(config["channel_id"]).send(msg);
});

// bot stuff
client.on("ready", () => {
    console.log("[WORKER] Discord -> ON");
});

client.on("message", (message) => {
	client.on("message", (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const argumentos = message.content.slice(prefix.length).trim().split(/ +/);
	const command = argumentos.shift().toLowerCase();
	if (command === 'vai-para') {
		console.log(argumentos.lenght)
		if (!argumentos.length){
			return message.channel.send("XYZ (São 3 coisas) /vai-para <xyz>");
		};
		if(argumentos.length === 3){
			const data = vec3(argumentos[0], argumentos[1], argumentos[2]);
			mc.navigate.to(data);
		};
	};
	if (!command === "vai-para"){
		console.log(command)
		mc.send("/" + command)
	};
});
});

client.login(process.env.discordkey);
