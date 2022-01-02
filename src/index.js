const Discord = require("discord.js");
const { Intents } = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const prefix = "#";

client.login(process.env.TOKEN);

client.on("ready", () => {
  console.log("Bot is ready!!!");
});

client.on("messageCreate", (msg) => {
  if (!msg.guild) return;
  if (!msg.content.startsWith(prefix)) return;

  if (msg.content === prefix + "Hello") {
    msg.reply({
      content: "Is Okay!!",
    });
  }

  if (msg.content === prefix + "Bom dia") {
    msg.reply({
      content: "Bom dia, " + msg.author.username,
    });
  }
});
