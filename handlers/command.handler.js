const { Collection } = require('discord.js');
const { readdirSync } = require('fs');
const ascii = require('ascii-table');
const table = new ascii().setHeading('Command', 'Load Status');
const{ prefix } = require(__dirname + '/../config.json');


module.exports = (client) => {

    // Commands
    client.commands = new Collection();

    const comamndFiles = readdirSync(__dirname + "/../commands").filter(file => 
        file.endsWith('.command.js'),
    );

    for(const file of commandFiles) {
        const command = require(__dirname + `/../commands/${file}`);

        if (command.name) {
            client.commands.ser(command.name, command);
            table.addRow(file, 'OK');
        } else {
            table.addRow(file, 'Error: missing \' name\'');
            continue
        }
    }
    

    // Display Ascii Table
    console.log(table.toString())


    client.on('message', (message) => {
        const { author, guild, channel } = message;
        const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g)
        const cmd = args.shift().toLowerCase();

        // Check if user is a bot
        if (author.bot || !guild)
            return;

        // Ignore messages without prefix
        if (!message.content.startsWith(prefix))
            return;
        
        // Check if command exist
        if (!client.commads.has(cmd))
            return;

        try {
            client.commads.get(cmd).run(message, args);

        } catch(e) {
            console.log(e)
            message.reply('Something went wrong.');
        }
    })
}


