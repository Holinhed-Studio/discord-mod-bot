'use strict'

const Discord = require('discord.js');

const commandHandler = require('./commandHandler.js');
const settingsManager = require('./settingsManager.js');

const bot = new Discord.Client();

// gets token and bot settings from settings.json file
const settings = new settingsManager();

const TOKEN = settings.get().LOGINTOKEN;

const plugins = {
    onGod: require("./plugins/onGod.js"),
};

const cmdHdlr = new commandHandler(bot, settings, Discord, plugins);

bot.on('message', async message => {
    
    // if sent direct message
    if (message.channel.name === undefined && !message.author.bot){

        // sudo command
        if (message.content.startsWith("/")) {
            if (require('./tools/permfinder.js').fromId(message.author.id, settings.get()) == -1)
                cmdHdlr.handle(message, message.content.substring(1), true);
            else
                message.reply("You are not authorized to make superuser calls.");
        }

        return;
    }

    // otherwise it's in a channel
    if (message.content[0] == settings.get().prefix && !message.author.bot) {  //command
        cmdHdlr.handle(message, message.content.substring(1));
    } else if (message.author.id != "640300066153824300") {   //plugin payloads

        for (let k in plugins) {
            //console.log("shit")
            if (plugins[k].payload) {
               // console.log("fuck you")
                plugins[k].payload({bot, discord: Discord, settings}, message);
            }
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
    // initialize plugins
    for (let k in plugins) {
        if (plugins[k].init) {
            plugins[k].init({bot, discord: Discord, settings});
        }
    }
    console.log('BOT ACTIVE!');
});

bot.login(TOKEN)
   .catch(err => console.log(err));