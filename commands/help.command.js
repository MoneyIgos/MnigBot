const Discord = require('discord.js');
const { readdirSync } = require('fs');

module.exports = {
    name: 'help',
    description: 'Displays every commands.',

    run(message) {

        // CHECKING COMMANDS LIST
        const commandFiles = readdirSync(`${__dirname}/../commands`).filter((file) => file.endsWith('.command.js'));

        //SENDING COMMAND LIST
        let commands = '';
        for (const file of commandFiles) {
            const command = require(`${__dirname}/../commands/${file}`);
            commands += `${command.name}\n`;       
        }
        const Embed = new Discord.MessageEmbed()
            .setColor('#247800')
            .setTitle('Command List')
            .addField('Commands:', commands);
        message.channel.send(Embed);
    }
};
