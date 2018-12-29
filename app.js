const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const config = require('./config.json')
client.commands = new Discord.Collection()

fs.readdir('./commands', (err, files) => {
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split('.').pop() === 'js') 
    if (jsfile.length <= 0) return console.log('Команды не найдены!') 

    })

    fs.readdir(`./events/`, (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
          let eventFunction = require(`./events/${file}`);
          let eventName = file.split(".")[0];
          client.on(eventName, (...args) => eventFunction.run(client, ...args));
        });
        });

console.log(`В сети`);

client.on('ready', () => {
    client.user.setPresence({status: 'PLAYING', game:{name: 'Dex by HTNpic | n!help', type: 0}})
})

client.login(config.token)
