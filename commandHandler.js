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

   constructor(botref, settingsref) {
      this.botref = botref;
      this.settingsref = settingsref;
   }

   handle(message, cmdstr, sudo) {

      if (!this.settingsref.get().doCommands && !sudo) {
         message.channel.send("Commands are currently disabled by administrators.");
         return;
      }
      
      let commandStream = cmdstr.split(" ");

      const command = commandStream[0].trim();

      commandStream.shift()

      if (command == 'help') {
         commandMap["system_help"].payload({bot: this.botref, settings: this.settingsref, message}, commandMap, commandStream);
         return;
      }

      if (command == 'list') {
         commandMap["system_list"].payload({bot: this.botref, settings: this.settingsref, message}, commandMap, commandStream);
         return;
      }

      if (command == 'reload') {
         require('./commandRegistar.js')
         .then(value => {
            commandMap = value;
            message.channel.send("Reload Complete.");
         });
         return;
      }

     const permValue = findPermLevel.fromMessage(message, this.settingsref.get());

      try {
         if (permValue < commandMap[command].permissions && permValue != -1) {
            message.reply("You do not have permisson to run that command.");
            return;
         }

         const result = commandMap[command].payload({bot: this.botref, settings: this.settingsref, message}, commandStream);

         if (result == 1) {
            message.channel.send("There was a problem running that command. Check logs.");
         } else if (result == 2) {
            message.channel.send(`Usuage: ${this.settingsref.get().prefix}${command} ${commandMap[command].usuage}`);
         }

      } catch (e) {
         console.error(e);
         message.channel.send("Command \"" + command + "\" not found.");
      }

   }

}

module.exports = commandHandler;