'use strict'

const findPermLevel= require('./tools/permfinder.js');

let commandMap;

require('./commandRegistar.js')
.then(value => {
   commandMap = value;
});

/*
Calls command functions by
arg0 = {botref, settings, messageref}
arg1 = array of args for command.
*/

class commandHandler {

   constructor(botref, settingsref, discordref, pluginsref) {
      this.botref = botref;
      this.settingsref = settingsref;
      this.discordref = discordref;
      this.perr = null;
      this.pluginsref = pluginsref;
   }

   handle(message, cmdstr, sudo) {

      if (!this.settingsref.get().doCommands && !sudo) {
         message.channel.send("Commands are currently disabled by administrators.");
         return;
      }
      
      let commandStream = cmdstr.split(" ");

      const command = commandStream[0].trim();

      commandStream.shift();

      const permValue = findPermLevel.fromMessage(message, this.settingsref.get());

      if (command == 'help') {
         if (permValue >= commandMap["system_help"].permissions || permValue == -1)
            commandMap["system_help"].payload({bot: this.botref, settings: this.settingsref, message, discord: this.discordref}, commandMap, commandStream);
         return; 
      }

      if (command == 'list') {
         if (permValue >= commandMap["system_list"].permissions || permValue == -1)
            commandMap["system_list"].payload({bot: this.botref, settings: this.settingsref, message, discord: this.discordref}, commandMap, commandStream);
         return;
      }

      if (command == 'perr') {
         if (permValue >= commandMap["system_perr"].permissions || permValue == -1)
            if (this.perr == null) {
               message.channel.send("There are no reported errors yet.");
            } else {
               message.channel.send("```[" + this.perr.toString() + "]\n" + this.perr.stack + "```");
            }
         return;
      }

      if (command == 'reload' && (permValue >= commandMap["system_reload"].permissions || permValue == -1)) {
         require('./commandRegistar.js')
         .then(value => {
            commandMap = value;
            message.channel.send("Reload Complete.");
         });
         return;
      }

      try {
         if (permValue < commandMap[command].permissions && permValue != -1) {
            message.reply("You do not have permisson to run that command.");
            return;
         }

         const result = commandMap[command].payload({bot: this.botref, settings: this.settingsref, message, discord: this.discordref}, commandStream);

         if (result == 1) {
            message.channel.send("There was a problem running that command. Check logs.");
         } else if (result == 2) {
            message.channel.send(`Usuage: ${this.settingsref.get().prefix}${command} ${commandMap[command].usuage}`);
         }

      } catch (e) {
         console.error(e);
         this.perr = e;
         message.channel.send("Command \"" + command + "\" not found.");
      }

   }

}

module.exports = commandHandler;