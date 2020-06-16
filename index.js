const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config/config.json');
const commandHandler = require('./handlers/command.handler.js');

// Initialize command handler
commandHandler(client);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity('>help', { type: 'LISTENING' });
});
client.login(token);
