const { player } = require(".");

module.exports = async (client) => {
  player.on("trackStart", async (queue, track) => {
    queue.metadata.channel.send(`🎵 Tocando \`${track.title}\``);
  });
};
