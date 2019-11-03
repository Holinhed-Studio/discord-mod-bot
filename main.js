'use strict'

const Discord = require('discord.js');

const commandHandler = require('./commandHandler.js');
const settingsManager = require('./settingsManager.js');

const bot = new Discord.Client();

// gets token and bot settings from settings.json file
let settings = new settingsManager();

const TOKEN = settings.get().LOGINTOKEN;

const cmdHdlr = new commandHandler(bot, settings);

bot.on('message', message => {
    
    // if sent direct message
    if (message.channel.name === undefined && !message.author.bot){

        return;
    }

    // otherwise it's in a channel
    if (message.content[0] == settings.get().prefix && !message.author.bot) {  //command
        cmdHdlr.handle(message, message.content.substring(1));
    } else if (settings.get().doOnGod && message.author.id != "640300066153824300") {   //ongod
        let str = message.content;
        str = str.toUpperCase().replace(/[^a-zA-Z1-9]/g, "").trim();

        if (str == "OHONGOD") {
            message.channel.send("On God.");
        } else if (str == "ONGOD") {
            message.channel.send("Oh, on God?");
        } else if (str == ".....") {
            message.channel.bulkDelete(0);
        }

    }

});

bot.on('ready', function(){
    bot.user.setStatus("available");
    bot.user.setPresence({
        game: {
            name: 'YOU!!',
            type: "WATCHING",
            url: "https://holinhed.com/discordbot"
        }
    });
    console.log('BOT ACTIVE!');
});

bot.login(TOKEN)
   .catch(err => console.log(err));