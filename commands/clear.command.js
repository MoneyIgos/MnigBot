module.exports = {
  name: 'clear',
  description: 'clearing messages',

  run(message, args) {
    const amount = args.join(' ');
    const member = message.mentions.members.first();

    if (!message.member.hasPermission(['MANAGE_MESSAGES']))
      return message.reply('Ughh... You need Manage Messages permissions to perform this command!');

    if (!message.guild.me.hasPermission(['MANAGE_MESSAGES']))
      return message.reply("I don't have permission to perform this command!");

    if (isNaN(amount) || !amount || !member)
      return message.reply('You have to specify an amount of messages to delete.');

    if (amount > 100) return message.reply("You can't clear more than 100 messages at once");

    if (amount < 1) return message.reply('You need to delete at least one message');

    message.channel.bulkDelete(amount).then(() => {
      message.channel.send(`Cleared ${amount} messages.`).then((message) => message.delete());
    });
  },
};
