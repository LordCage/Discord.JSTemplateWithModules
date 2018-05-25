/* Uncomment this if you don't want any errors to show up in the console!
process.on('uncaughtException', expection => {
    return;
});
process.on('warning', warning => {
    return;
});
process.on('unhandledRejection', rejection => {
    return;
});
*/


// Importing the client and Collection from D.JS + fs
const { Client, Collection } = require('discord.js');
const fs = require('fs');

// We import the logger
const logger = require('./util/logger');

// Creating a new D.JS Client
const client = new Client({ autoReconnect: true });

// This will take care of all the events
require('./util/eventLoader')(client);

// Binding the config file to the client
client.config = require('./config.json');

// These "store" the commands and their aliases
client.commands = new Collection();
client.aliases = new Collection();

// This will "store" the command cooldowns per user
client.cooldowns = new Collection();

fs.readdir('./commands/', (err, files) => {
    if (err) new logger().error(err);
    files.forEach(file => {
        fs.lstat(`./commands/${file}`, (err, stats) => {
            if (err) return;
            if (!stats.isDirectory()) return;
            else {
                fs.readdir(`./commands/${file}`, (err, files) => {
                    files.forEach(file2 => {
                        if (!file2.endsWith('.js')) return;
                        const cmd = require(`./commands/${file}/${file2}`);
                        client.commands.set(cmd.help.name, cmd);
                        cmd.help.aliases.forEach(alias => {
                            client.aliases.set(alias, cmd.help.name);
                        });
                    });
                });
            }
        });
        if (!file.endsWith('.js')) return;
        const cmd = require(`./commands/${file}`);
        client.commands.set(cmd.help.name, cmd);
        cmd.help.aliases.forEach(alias => {
            client.aliases.set(alias, cmd.help.name);
        });
    });
});

// Don't touch these two, they are the "reload" and "load" functios.
let reload = (message, cmd) => {
    delete require.cache[require.resolve('./commands/' + cmd)];
    try {
        let cmdFile = require('./commands/' + cmd);
    } catch (error) {
        message.channel.send(`Problem loading ${cmd}: ${error}`).then(
            response => response.delete(1000).catch(error => console.log(error))
        ).catch(error => console.log(error))
    }
    message.channel.send(`Reloaded ${cmd} successfully!`).then(
        response => response.delete(1000).catch(error => console.log(error))
    ).catch(error => console.log(error));
},
    load = (message, cmd) => {
        try {
            let cmdFile = require('./commands/' + cmd);
        }
        catch (error) {
            message.channel.send(`Problem loading ${cmd}:\n\`\`\`${error}\`\`\``).then(
                response => response.delete(1000).catch(error => console.log(error))
            ).catch(error => console.log(error));
        }
        message.channel.send(`Loaded ${cmd} successfully!`).then(
            response => response.delete(1000).catch(error => console.log(error))
        ).catch(error => console.log(error));
    };
exports.reload = reload;
exports.load = load;

// We log in with the token from the config file
client.login(client.config.token);