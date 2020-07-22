module.exports = {
  name: 'say',
  description: 'Saying what you want to Mnigbot say.',

  run(message, args) {
    const toSay = args.join(' ');

    if (
      !message.member.hasPermission(['MANAGE_MESSAGES']) ||
      message.member != '294936820595163142'
    )
      return message.reply("You don't have permissions to execute that command.");

    if (!toSay) return message.reply("I can't say a silence.");

    message.channel.send(`${toSay}`).then(message.delete());
  },
};
