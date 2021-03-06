const Discord = require('discord.js');
new Discord.Client();

module.exports = {
  name: 'unmute',
  description: 'Unmute Member.',

  run(message) {
    const member = message.mentions.members.first();
    const muted = message.guild.roles.cache.find((role) => role.name === 'muted');
    const channel = message.guild.channels.cache.get('698120856383127600');

    if (!message.member.hasPermission(['MANAGE_ROLES']))
      return message.reply('Ughh... You need Manage Roles permissions to perform this command!');

    if (!message.guild.me.hasPermission(['MANAGE_ROLES']))
      return message.reply("I don't have permission to perform this command!");

    if (!member) return message.reply('You must provide a user to kick!');

    message.channel
      .send(`**${member.user.tag}** has been unmuted`)
      .then(() => member.roles.remove(muted))
      .then(member.setNickname(member.user.username, 'Unmuted'))
      .catch((e) => console.log(e));

    if (channel) {
      const embed = new Discord.MessageEmbed()
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
  },
};
