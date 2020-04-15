const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'kick',
    description: 'kick Member.',

    run(message, args) {
        //PERMISIONS
        if(!message.member.hasPermission(['KICK_MEMBERS']))
            return message.reply('Ughh... You need Kick Members permissions to perform this command!')

        //MEMBER TO KICK
        const member = message.mentions.members.first();
        if(!member) 
            return message.reply('You must provide a user to kick!');
        
        //REASON    
        const reason = args.slice(1).join(' ') || 'No reason given';
        
        //BOT PERMISIONS
        if(!message.guild.me.hasPermission(['KICK_MEMBERS']))
            return message.reply('I don\'t have permission to perform this command!');

        //KICKING
        member.send(`You have been kicked from ${message.guild.name} for: ${reason}`)
        .then(() => member.kick())
        .catch(e => console.log(e))
        message.channel.send(`**${member.user.tag}** has been kicked`)

        //SENDING MODLOG
        const channel = message.guild.channels.cache.get('698120856383127600');
        let embed = new Discord.MessageEmbed()
            .setColor('#cc0000')
            .setAuthor(`${message.guild.name} Modlogs`)
            .addFields(
                { name: 'Member:', value: member.user.tag, inline: true },
                { name: 'Moderation:', value: 'kick', inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'Moderator:', value: message.author.tag, inline: true },
                { name: 'Reason:', value: reason, inline: true },
                { name: 'Date:', value: message.createdAt.toLocaleString() }
            )
        channel.send(embed);
    }
}