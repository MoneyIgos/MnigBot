const Discord = require('discord.js');
new Discord.Client();

module.exports = {
  name: 'mute',
  description: 'Mute Member.',

  run(message, args) {
    const member = message.mentions.members.first();
    const reason = args.slice(1).join(' ') || 'No reason given';
    const channel = message.guild.channels.cache.get('698120856383127600');
    const muted = message.guild.roles.cache.find((role) => role.name === 'muted');

    if (!message.member.hasPermission(['MANAGE_ROLES']))
      return message.reply('Ughh... You need Manage Roles permissions to perform this command!');

    if (!message.guild.me.hasPermission(['MANAGE_ROLES']))
      return message.reply("I don't have permission to perform this command!");

    if (!member) return message.reply('You must provide a user to mute!');

    if (message.guild.me.hasPermission(['MANAGE_NICKNAMES']))
      member.setNickname(`[MUTED] ${member.user.username}`, 'Muted');

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

    if (!muted) {
      message.guild.roles.create({
        data: {
          name: 'muted',
          permissions: [],
        },
      });
    }

    message.channel
      .send(`**${member.user.tag}** has been muted for: ${reason}`)
      .then(() => member.roles.add(muted))
      .catch((e) => console.log(e));
  },
};
