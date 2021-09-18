const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
require('console-stamp')(console, 'HH:MM:ss.l');

if (!process.env.DISCORD_API_KEY || process.env.DISCORD_API_KEY.length <= 0) {
    console.log('ERROR: Env variable DISCORD_API_KEY does not exists or is empty!');
    process.exit(1);
}

if (!process.env.FEAR_AND_GREED_API_URL || process.env.FEAR_AND_GREED_API_URL.length <= 0) {
    console.log('ERROR: Env variable FEAR_AND_GREED_API_URL does not exists or is empty!');
    process.exit(1);
}

const discordApiKey = process.env.DISCORD_API_KEY;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('? USD', { type: 'WATCHING' } );
    fetch(options.url).then(callback);
});

const options = {
    url: process.env.FEAR_AND_GREED_API_URL
};

function callback(res) {
    console.log("Got response with http-code: " + res.status + " - " + res.statusText);

    if (res.ok) {
        res.json().then(function onData(jsonObject) {
            // there should be 4 elements in the array
            const elements = jsonObject.all;

            if (5 !== elements.length) {
                console.log('ERROR, response is: ' + JSON.stringify(jsonObject) + ' elements: ' + elements.length);
                return;
            }

            console.log('Setting status: ' + elements[0]);
            client.user.setActivity(elements[0], {type: 'WATCHING'});
        });
    } else {
        client.user.setActivity('?', { type: 'WATCHING'});
    }
}

setInterval(function() {
    console.log("Requesting... " + options.url);
    fetch(options.url)
        .then(callback);
}, 1000*1800);

console.log("Logging in with: " + discordApiKey);
client.login(discordApiKey);
