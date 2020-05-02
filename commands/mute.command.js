const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'mute',
    description: 'Mute Member.',

    run(message, args) {
        //PERMISIONS
        if(!message.member.hasPermission(['MANAGE_ROLES']))
            return message.reply('Ughh... You need Manage Roles permissions to perform this command!')

        //BOT PERMISIONS
        if(!message.guild.me.hasPermission(['MANAGE_ROLES']))
            return message.reply('I don\'t have permission to perform this command!');

        //MEMBER TO KICK
        const member = message.mentions.members.first();
        if(!member) 
            return message.reply('You must provide a user to kick!');

        //REASON    
        const reason = args.slice(1).join(' ') || 'No reason given';

        
    }
}