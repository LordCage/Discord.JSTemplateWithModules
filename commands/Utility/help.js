// We import Message Embed so we can create a new Embed
const { RichEmbed } = require('discord.js');

// FS will read the commands folder for us.
const fs = require('fs');

exports.run = (client, message, args) => {

    let command = args[0];

    if (!command) {
        // You can do something here
        message.channel.send(`Please mention a command you want help with!\nExample: \`${client.config.prefix}help ping\``)
        return;
    }

    try {
        let help = client.commands.get(command).help;
        let conf = client.commands.get(command).conf;

        let name = help.name || 'No name provided.';
        let description = help.description || 'No description provided.';
        let usage = client.config.prefix + command + ' ' + help.usage || 'No usage provided.';
        let cooldown = `${conf.cooldown} seconds.` || '3 seconds.';
        let aliases = help.aliases.length >= 1 ? help.aliases.join(', ') : 'No aliases provided.';

        const embed = new RichEmbed()
            .setAuthor(message.member.displayName, message.author.avatarURL)
            .setDescription(`Name: **${name}**\nDescription: **${description}**\nAliases: **${aliases}**\nCooldown: **${cooldown}**\nUsage: **${usage}**`)
            .setFooter(`Help for command ${args[0]}`)
            .setColor(message.member.displayHexColor)
            .setTimestamp();

        message.channel.send(embed)
    } catch (err) {
        message.channel.send(`Invalid command | Help not set up properly`)
    }

};

exports.help = {
    name: 'help',
    description: 'Displays information about a command.',
    category: '',
    aliases: [],
    usage: '<command-name>',
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    ownerOnly: false,
    cooldown: 3
}