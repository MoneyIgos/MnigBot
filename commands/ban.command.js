const Discord = require('discord.js');
new Discord.Client();

module.exports = {
  name: 'ban',
  description: 'ban Member.',

  run(message, args) {
    const member = message.mentions.members.first();
    const reason = args.slice(1).join(' ') || 'No reason given';
    const channel = message.guild.channels.cache.get('698120856383127600');

    // Checking user permissions
    if (!message.member.hasPermission(['BAN_MEMBERS']))
      return message.reply('Ughh... You need Ban Members permissions to perform this command!');

    // Checking member to ban
    if (!member) return message.reply('You must provide a user to ban!');

    // Checking bot permissions
    if (!message.guild.me.hasPermission(['BAN_MEMBERS']))
      return message.reply("I don't have permission to perform this command!");

    // Sending Modlog
    if (!channel) {
      const embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setAuthor(`[BAN] ${member.user.tag}`)
        .addFields(
          { name: 'Member:', value: member, inline: true },
          { name: 'Moderation:', value: 'ban', inline: true },
          { name: 'Moderator:', value: message.author, inline: true },
          { name: 'Reason:', value: reason, inline: true },
          { name: 'Date:', value: message.createdAt.toLocaleString() }
        );
      channel.send(embed);
    }

    // Banning
    member
      .send(`You have been banned from ${message.guild.name} for: ${reason}`)
      .then(() => member.ban())
      .catch((e) => console.log(e));
    message.channel.send(`**${member.user.tag}** has been kicked`);
  },
};
