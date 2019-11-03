'use strict'

const findPermLevel= require('./tools/permfinder.js');

const commandMap = {
   "test": require('./commands/test.js'),
   "toggleOnGod": require('./commands/toggleOnGod.js'),
   "setPrefix": require('./commands/setPrefix.js'),
   "clearChannel": require('./commands/bulkDelete.js'),
   "disableCommands": require('./commands/disableCommands.js'),
}

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

         if (commandStream.length == 0) {
            message.channel.send("Here you go: http://fantasy.works/");
            return;
         }

         const commandQueue = [];

         commandStream.forEach(val => {

            if (commandQueue.includes(val)) return;

            commandQueue.push(val);

            if (val == 'help') {
               message.channel.send(">>> __help__\n\n**Usuage**: !help <command...>\n\n" + 
               "**Description**: Gets documentation about a command.\n\n" + 
               "**Permissions**: No Permissions Required.");
               return;
            }

            try {

               const c = commandMap[val];

               const usuage = c.usuage || "";
               const desc = c.desc || "No Description Provided.";
               const perms = c.permissions || "No Permissions Required.";

               message.channel.send(`>>> __${val}__\n\n**Usuage**: ${this.settingsref.get().prefix}${val} ${usuage}\n\n**Description**: ${desc}\n\n**Permissions**: ${perms}`);
            } catch (e) {
               message.channel.send("Command \"" + val + "\" does not exist.");
            }

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