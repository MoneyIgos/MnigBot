const Discord = require('discord.js');
const bot = new Discord.Client();
const{ prefix, token } = require('./config.json');

bot.on('ready', () => 
{
    console.log('Bot is online');
    bot.user.setActivity('>help');
})
bot.login(token);

bot.on('msg', msg => {

})