// We import Rich Embed so we can create a new Embed
const { RichEmbed } = require('discord.js');

// FS will read the commands folder for us.
const fs = require('fs');

exports.run = (client, message, args) => {

    let command = args[0];

    if (!command) {
        // Replace this if you want something else to show all the available commands
        let commands = new Array();
        let ownerCommands = new Array();

        fs.readdir('./commands', (err, files) => {
            files.forEach(file => {
                if (file.endsWith('.js') && /* This will hide the ownerOnly commands from the help */ !require(`./${file}`).conf.ownerOnly) {
                    commands.push(file.replace('.js', ''))
                } else if (file.endsWith('.js') && /* This will make it display ownerOnly commands */ require(`./${file}`).conf.ownerOnly) {
                    ownerCommands.push(file.replace('.js', ''))
                }
            });
            message.channel.send(`Here are all the currently available commands: __**${commands.join(', ')}**__\nOwner Commands: __**${ownerCommands.join(', ')}**__\nFor details and such use ${client.config.prefix}help and the command name.`)
        });
        return;
    }

    try {
        let help = require(`./${command}`).help;
        let conf = require(`./${command}`).conf;

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
    aliases: [],
    usage: '<command-name>',
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    ownerOnly: false,
    cooldown: 3
}