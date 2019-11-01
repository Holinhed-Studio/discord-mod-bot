'use strict'

const Discord = require('discord.js');

const bot = new Discord.Client();

const TOKEN = 'TBD';

bot.on('ready', function(){
    bot.user.setStatus({
        game: {
            name: 'YOU',
            type: 'WATCHING'
        },
        status: 'online'
    });
    console.log('BOT ACTIVE!');
});

bot.login(TOKEN)
   .catch(err => console.log(err));