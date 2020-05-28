const Discord = require('discord.js');
new Discord.Client();
const ms = require('ms');

module.exports = {
    name: 'tempmute',
    description: 'Mute Member.',

    run(message, args) {
        // Checking user permissions
        if (!message.member.hasPermission(['MANAGE_ROLES']))
            return message.reply(
                'Ughh... You need Manage Roles permissions to perform this command!'
            );

        // Checking bot permissions
        if (!message.guild.me.hasPermission(['MANAGE_ROLES']))
            return message.reply("I don't have permission to perform this command!");

        // Checking member to mute
        const member = message.mentions.members.first();
        if (!member) return message.reply('You must provide a user to mute!');

        // Checking mutetime
        const mutetime = args[1];
        if (!mutetime) return message.reply('You have to specify a mute time!');

        // Checking reason
        const reason = args.slice(2).join(' ') || 'No reason given';

        // Sending Modlog
        const channel = message.guild.channels.cache.get('698120856383127600');
        if (channel) {
            const embed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setAuthor(`[MUTE] ${member.user.tag}`)
                .addFields(
                    { name: 'Member:', value: member, inline: true },
                    { name: 'Moderator:', value: message.author, inline: true },
                    { name: 'Reason:', value: reason, inline: true },
                    { name: 'Date:', value: message.createdAt.toLocaleString() }
                );
            channel.send(embed);
        }

        // Cheching rank
        const muted = message.guild.roles.cache.find((role) => role.name === 'muted');
        if (!muted) {
            message.guild.roles.create({
                data: {
                    name: 'muted',
                    color: '#010101',
                    permissions: [],
                },
            });
        }

        // Muting
        message.channel
            .send(`**${member.user.tag}** has been muted for: ${mutetime} \nreason: ${reason}`)
            .then(() => member.roles.add(muted))
            .then(member.setNickname(`[MUTED] ${member.user.username}`, 'Muted'))
            .catch((e) => console.log(e));

        setTimeout(() => {
            message.channel
                .send(`**${member.user.tag}** has been unmuted.`)
                .then(() => member.roles.remove(muted))
                .then(() => member.setNickname(member.user.username, 'Unmuted'))
                .catch((e) => console.log(e));
        }, ms(mutetime));
    },
};
