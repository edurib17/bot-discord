const { Client } = require("discord.js");
const { Player } = require("discord-player");
const { prefix, token } = require("../info.json");

const client = new Client({
  restTimeOffset: 0,
  shards: "auto",
  intents: 641,
});

const player = new Player(client, {
  leaveOnEnd: true,
  leaveOnStop: true,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 5000,
  autoSelfDeaf: true,
  initialVolume: 50,
  bufferingTimeout: 3000,
});

module.exports = { player, client };

client.on("ready", () => {
  console.log("bot is already activated 🤖 ");
  client.user.setActivity("Your Song", { type: "PLAYING" });
});

require("./events")(client);

client.on("messageCreate", (msg) => {
  if (!msg.guild || msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;

  const url = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = url.shift().toLowerCase();

  require("./commands")(client, msg, url, command);
});

client.login(token);
