const mineflayer = require("mineflayer");
const discord = require("discord.js");
//const navigatePlugin = require('mineflayer-navigate')(mineflayer);
const config = require("./config.json");

// minecraft stuff
const client = new discord.Client({autoReconnect: true}); //Caso que o discord me mande fuder na ligação
const options = {
    host: 'mc.hypixel.net',
    port: 25565,
    version: '1.8.9',
    username: config["minecraft-username"],
    password: config["minecraft-password"],
};

let mc;
(function init() {
    console.log("[WORKER] Minecraft -> Iniciando sessão na conta");
    mc = mineflayer.createBot(options);
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
    uuid = mc._client.session.selectedProfile.id;
    name = mc._client.session.selectedProfile.name;
    setTimeout(() => {
    	console.log("[WORKER] Minecraft -> Ligação completa ao server")
        console.log("[WORKER] Minecraft -> Indo para skyblock.");
    }, 1000);
    
});

mc.on('kicked', function(reason) {
  client.channels.get(config["channel_id"]).send("> Desconectado do server\n", { reason });
});

mc.on("message", (chatMsg) => {
    const msg = chatMsg.toString();
    console.log(msg);
    client.channels.get(config["channel_id"]).send("> Messagem: Recebida\n", { msg });
});

// bot stuff
client.on("ready", () => {
    console.log("[WORKER] Discord -> ON");
});

client.login(process.env.discordkey);
