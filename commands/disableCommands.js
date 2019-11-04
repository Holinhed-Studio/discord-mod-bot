'use strict'

module.exports = {
   name: "disableCommands",
   desc: "Disables Bot Commands. Have to be re-enabled by a superuser.",
   permissions: 20,
   usuage: "",
   payload(sys, args) {

      const settings = sys.settings.get();

      const newVal = args.length > 0;

      if (newVal == settings.doCommands) {
         sys.message.reply("Nothing would change. Aborting.");
         return;
      }

      settings.doCommands = newVal;

      sys.settings.update(settings);

      sys.message.reply("COMMANDS ARE NOW " + (settings.doCommands ? "ENABLED" : "DISABLED"));

   }
}