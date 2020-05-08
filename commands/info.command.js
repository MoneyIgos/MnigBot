const Discord = require('discord.js');
new Discord.Client();
const { version, author } = require(`${__dirname}/../package.json`);

module.exports = {
    name: 'info',
    description: 'Displays bot informations.',

    // Sending info command
    run(message) {
        const Embed = new Discord.MessageEmbed()
            .setColor('#247800')
            .setTitle('MnigBot Information')
            .setDescription(
                '**[Discord Server](https://discord.gg/WAk3GGV)\n[GitHub Code](https://github.com/MoneyIgos/MnigBot)\n[Add me to your server](https://discordapp.com/oauth2/authorize?client_id=697791574733750322&scope=bot&permissions=8)**'
            )
            .addFields(
                { name: 'Author:', value: `${author}`, inline: true },
                { name: 'Version:', value: `${version}`, inline: true }
            );
        message.channel.send(Embed);
    },
};
