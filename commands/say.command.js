module.exports = {
  name: 'say',
  description: 'Saying what you want to Mnigbot say.',

  // Sending info command
  run(message, args) {
    const toSay = args.join(' ');

    // Checking permissions
    if (
      !message.guild.me.hasPermission(['ADMINISTRATOR']) ||
      message.author == '294936820595163142'
    )
      return message.reply("You don't have permissions to execute that command.");

    // Checking if toSay exists
    if (!toSay) return message.reply("I can't say a silence.");

    message.channel.send(`${toSay}`).then(message.delete());
  },
};
