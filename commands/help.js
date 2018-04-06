// We import discord.js so we can create a new Embed
const Discord = require('discord.js');

exports.run = (client, message, args) => {

    if (!args[0]) {
        /*
            A list of your commands? Return? Do whatever you want here.
        */
        return;
    }

    try {
        let help = require(`./${args[0]}.js`).help;

        let name = help.name || 'No name provided.';
        let description = help.description || 'No description provided.';
        let usage = help.usage || 'No usage provided.';

        const embed = new Discord.RichEmbed()
            .setAuthor(message.member.displayName, message.author.avatarURL)
            .setDescription(`Name: **${name}**\nDescription: **${description}**\nUsage: **${usage}**`)
            .setFooter(`Help for command ${args[0]}`)
            .setColor(message.member.displayHexColor)
            .setTimestamp();

        message.channel.send(embed)
    } catch (err) {
        message.channel.send(`Invalid command | Help not set up properly`)
    }

};

exports.help = {
    name: 'Help',
    description: 'Displays information about a command.',
    usage: '<command-name>'
}