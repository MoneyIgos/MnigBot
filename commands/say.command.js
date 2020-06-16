module.exports = {
  name: 'say',
  description: 'Saying what you want to Mnigbot say.',

  // Sending info command
  run(message, args) {
    const toSay = args.join(' ');

    // Checking if toSay exists
    if (!toSay) return message.reply("I can't say a silence.");

    message.channel.send(`${toSay}`).then(message.delete());
  },
};
