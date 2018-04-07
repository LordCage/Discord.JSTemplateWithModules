// We import discord.js so we can create a new Embed
const Discord = require('discord.js');
// Importing the prefix so we can use it bellow
const { prefix } = require('../config.json');
// FS will read the commands folder for us.
const fs = require('fs');

exports.run = (client, message, args) => {

    let command = args[0];
    
    if (!command) {
        // Replace this if you want something else to show all the available commands
        let commands = new Array();
        fs.readdir('./commands', (err, files) => {
            files.forEach(file => {
                if (file.includes('.js')) {
                    commands.push(file.replace('.js', ''))
                }
            });
            message.channel.send(`Here are all the currently available commands: __**${commands.join(', ')}**__\nFor details and such use ${prefix}help and the command name.`)
        });
        return;
    }

    try {
        let help = require(`./${command}.js`).conf;

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

exports.conf = {
    name: 'help',
    description: 'Displays information about a command.',
    aliases: [],
    usage: '<command-name>',
    
    enabled: true,
    guildOnly: true,
    ownerOnly: false
}