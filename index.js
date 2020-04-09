const Discord = require('discord.js');
const bot = new Discord.Client();
const{ prefix, token } = require('./config.json');
const s = '';

bot.on('ready', () => 
{
    console.log('Bot is online');
    bot.user.setActivity('>help');
})
bot.login(token);ssdadasdw

bot.on('msg', msg => {

})