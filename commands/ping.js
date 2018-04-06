// Example ping command
exports.run = (client, message, args) => {
        let uptime = client.uptime;
        message.channel.send(`Pong!`).then(msg => {
            msg.edit(`Pong!\nCurrent server latency: ${msg.createdTimestamp - message.createdTimestamp}ms!`)
        }).catch(err => message.channel.send(err))
};
