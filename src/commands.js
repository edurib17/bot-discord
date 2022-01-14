const { player } = require(".");

module.exports = async (client, msg, url, command) => {
  if (command === "tocar") {
    const channel = msg.member.voice.channel;
    if (!channel)
      return msg.channel.send("Você precisa entrar no canal de voz!!!");

    const search_music = url.join(" ");
    if (!search_music)
      return msg.channel.send("Digite o nome ou link de uma musica!!!");

    let queue = player.createQueue(msg.guild.id, {
      metadata: {
        channel: msg.channel,
      },
    });
    try {
      if (!queue.connection) await queue.connect(channel);
    } catch {
      queue.destroy();
      return await msg.reply({
        content: "Não foi possível participar do seu canal de voz!",
        ephemeral: true,
      });
    }

    let song = await player
      .search(search_music, {
        requestedBy: msg.author,
      })
      .then((x) => x.tracks[0]);
    client.user.setActivity(song.title, { type: "PLAYING" });
    if (!song) return msg.reply(` Musica invalida \`${search_music}\` `);
    queue.play(song);

    msg.channel.send({ content: `⏳ | Buscando... **${song.title}**!` });
  } else if (command === "skip") {
    let queue = player.getQueue(msg.guild.id);
    queue.skip();
    msg.channel.send(`Proxima musica...`);
  } else if (command === "stop") {
    let queue = player.getQueue(msg.guild.id);
    queue.stop();
    msg.channel.send(`Pediu pra parar parouuu...`);
  } else if (command === "pause") {
    let queue = player.getQueue(msg.guild.id);
    queue.setPaused(true);
    msg.channel.send(`Musica Pausada...`);
  } else if (command === "resume") {
    let queue = player.getQueue(msg.guild.id);
    queue.setPaused(false);
    msg.channel.send(`Continuando a tocar...`);
  }
};
