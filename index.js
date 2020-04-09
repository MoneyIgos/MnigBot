const Discord = require('discord.js');
const client = new Discord.Client();
const{ token } = require('./config.json');
const commandHandler = require('./handlers/command.handler.js');


// Initialize command handler
commandHandler(client);

client.on('ready', () => 
{
    console.log('Bot is online');
    client.user.setActivity('>help');
})
client.login(token);