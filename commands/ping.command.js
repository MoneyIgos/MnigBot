const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'ping',
    description: 'Ping',

    async run(message) {
        const m = await message.channel.send('Pong? wait...');
        m.edit(`Pong ${m.createdTimestamp - message.createdTimestamp}ms`);
    }
}