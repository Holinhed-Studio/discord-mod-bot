'use strict'

function commandPayload(sys, args) {
   let settings = sys.settings.get();

   if (args.length == 0) return 2;

   if (settings.prefix == args[0]) {
      sys.message.channel.send("The prefix is already " + args[0]);
      return;
   }

   settings.prefix = args[0];
   
   try {
      sys.settings.update(settings);
   } catch (e) {
      console.log(e);
      return 1;
   }

   sys.message.channel.send("The prefix is now " + settings.prefix);
}

const setPrefix = {
   desc: "Changes the prefix for holinbot commands.",
   permissions: 10,
   usuage: "<prefix>",
   payload: commandPayload,
}

module.exports = setPrefix;