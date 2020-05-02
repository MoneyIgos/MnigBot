const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'unmute',
    description: 'Unmute Member.',

    run(message, args) {
        // PERMISIONS
        if(!message.member.hasPermission(['MANAGE_ROLES']))
            return message.reply('Ughh... You need Manage Roles permissions to perform this command!');

        // BOT PERMISIONS
        if(!message.guild.me.hasPermission(['MANAGE_ROLES']))
            return message.reply('I don\'t have permission to perform this command!');

        // MEMBER TO UNMUTE
        const member = message.mentions.members.first();
        if(!member) 
            return message.reply('You must provide a user to kick!');

        // UNMUTING
        const muted = message.guild.roles.cache.find(role => role.name === 'muted');
        message.channel.send(`**${member.user.tag}** has been unmuted`)
            .then(() => member.roles.remove(muted))
            .catch(e => console.log(e));

        // SENDING MODLOG
        const channel = message.guild.channels.cache.get('698120856383127600');
        let embed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setAuthor(`[UNMUTE] ${member.user.tag}`)
            .addFields(
                { name: 'Member:', value: member, inline: true },
                { name: 'Moderation:', value: 'unmute', inline: true },
                { name: 'Moderator:', value: message.author, inline: true },
                { name: 'Date:', value: message.createdAt.toLocaleString() }
            );
        channel.send(embed);   
    }
};