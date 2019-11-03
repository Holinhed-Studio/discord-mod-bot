'use strict'

module.exports = {
   desc: "Disables Bot Commands. Have to be re-enabled by a superuser.",
   permissions: 20,
   usuage: "",
   payload(sys, args) {

      const settings = sys.settings.get();

      settings.doCommands = args.length > 0;

      sys.settings.update(settings);

      sys.message.reply("COMMANDS ARE NOW " + (settings.doCommands ? "ENABLED" : "DISABLED"));

      
   }
}