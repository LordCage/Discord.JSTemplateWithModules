const ms = require('ms');

function Capitalize(word) {
    let toReturn;
    let split = word.split('');
    toReturn = split.shift().toUpperCase();
    toReturn += split.join('');

    return toReturn;
}


exports.run = async (client, message, args) => {
    
    if (!args || args.length < 1) return message.channel.send('What should I eval tho? :thinking:');

    let msg = await message.channel.send('Processing...');

    let curDate;
    let result;

    try {
    curDate = new Date();
    result = await eval(args.join(' '));
    } catch (err) {
        result = err;
    }

    if (!result || result.length < 1) return msg.edit('Something went wrong or the eval returned nothing.');

    msg.edit(`**Output:** \`\`\`js\n${result}\`\`\`\n**Type:** \`\`\`ts\n${Capitalize(typeof result)}\`\`\`\n:stopwatch: ~${ms(new Date() - curDate, {long: true})}`)
};

exports.help = {
    name: 'eval',
    description: 'Evaluates Javascript (JS) code.',
    aliases: ['js-eval'],
    usage: '<code>',
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    ownerOnly: true,
    cooldown: 0
}
