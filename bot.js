const Discord = require("discord.js");
const client = new Discord.Client({ autoReconnect: true });

const config = require('./config.json');
const fs = require('fs');

require('./util/eventLoader')(client);

const token = config.token;

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

// Don't touch these! These set the commands and their aliases.
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  files.forEach(file => {
    const cmd = require(`./commands/${file}`);
    client.commands.set(cmd.conf.name, cmd);
    cmd.conf.aliases.forEach(alias => {
      client.aliases.set(alias, cmd.conf.name);
    });
  });
});


// Don't touch these! They're basically utility commands.
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

client.login(token);