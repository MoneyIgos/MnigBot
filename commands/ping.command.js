module.exports = {
  name: 'ping',
  description: 'Displays bots ping.',

  async run(message) {
    const m = await message.channel.send('Pong? wait...');
    m.edit(`Pong ${m.createdTimestamp - message.createdTimestamp}ms`);
  },
};
