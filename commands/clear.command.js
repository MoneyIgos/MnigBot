module.exports = {
  name: 'clear',
  description: 'clearing messages',

  run(message, args) {
    const amount = args.join(' ');

    // Checking user permissions
    if (!message.member.hasPermission(['MANAGE_MESSEGES']))
      return message.reply('Ughh... You need Manage Messages permissions to perform this command!');

    // Checking bot permissions
    if (!message.guild.me.hasPermission(['MANAGE_MESSAGES']))
      return message.reply("I don't have permission to perform this command!");

    // Checking if arg is amount
    if (isNaN(amount) || !amount)
      return message.reply('You have to specify an amount of messages to delete.');

    // Checking if amount is less than 100
    if (amount > 100) return message.reply("You can't clear more than 100 messages at once");

    // Checking if amount is more than 1
    if (amount < 1) return message.reply('You need to delete at least one message');

    message.channel.bulkDelete(amount).then(() => {
      message.channel.send(`Cleared ${amount} messages.`).then((message) => message.delete());
    });
  },
};
