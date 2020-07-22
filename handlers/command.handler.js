const { readdirSync } = require('fs');
const { prefix } = require(`${__dirname}/../config/config.json`);
const { Collection } = require('discord.js');
const ascii = require('ascii-table');
const table = new ascii().setHeading('Command', 'Load status');

module.exports = (client) => {
  client.commands = new Collection();

  const commandFiles = readdirSync(`${__dirname}/../commands`).filter((file) =>
    file.endsWith('.command.js')
  );

  for (const file of commandFiles) {
    const command = require(`${__dirname}/../commands/${file}`);

    if (command.name) {
      client.commands.set(command.name, command);
      table.addRow(file, 'OK');
    } else {
      table.addRow(file, "ERROR: Missing 'name'");
      continue;
    }
  }

  console.log(table.toString());

  client.on('message', async (message) => {
    const { author, guild } = message;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (author.bot || !guild) return;

    if (!message.content.startsWith(prefix)) return;

    if (!client.commands.has(cmd)) return;

    try {
      client.commands.get(cmd).run(message, args);
    } catch (e) {
      console.error(e);
      message.reply('Ughh... Something went wrong with execute that command!');
    }
  });
};
