const { readdirSync } = require('fs');
const { prefix } = require(__dirname + '/../config/config.json');
const { Collection } = require('discord.js');
const ascii = require('ascii-table');
const table = new ascii().setHeading('Command', 'Load status');

module.exports = (client) => {

  // Collections
  client.commands = new Collection();

  const commandFiles = readdirSync(__dirname + '/../commands').filter((file) =>
    file.endsWith('.command.js'),
  );

  for (const file of commandFiles) {
    const command = require(__dirname + `/../commands/${file}`);

    if (command.name) {
      client.commands.set(command.name, command);
      table.addRow(file, 'Query OK');
    } else {
      table.addRow(file, 'ERROR: Missing \'name\'');
      continue
    }
  }

  console.log(table.toString());

  client.on('message', (msg) => {
    const { author, guild } = msg;
    const args = msg.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g)
      const cmd = args.shift().toLowerCase();

    // Check if user is a bot
    if (author.bot || !guild)
      return;

    // Ignore messages without prefix
    if (!msg.content.startsWith(prefix)) 
      return;

    // Check if commands exist
    if (!client.commands.has(cmd)) 
      return;

    try {
      client.commands.get(cmd).run(msg, args);
    } catch (error) {
      console.error(error);
      msg.reply('there was an error trying to execute that command!');
    }
  })
}
