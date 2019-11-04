'use strict'

function commandPayload(sys, args) {
   let settings = sys.settings.get();

   if (args[0] == 'true') {

      if (settings.doOnGod == true) {
         sys.message.channel.send("OnGod is already turned on :)");
         return;
      }

      settings.doOnGod = true;
      sys.message.channel.send("OnGod is now turned on :D");

   } else if (args[0] == 'false') {

      if (settings.doOnGod == false) {
         sys.message.channel.send("OnGod is already turned off :(");
         return;
      }

      settings.doOnGod = false;
      sys.message.channel.send("OnGod is now turned off :'(");

   } else {
      return 2;
   }

   try {
      sys.settings.update(settings);
   } catch (e) {
      console.log(e);
      return 1;
   }
}

const toggleOnGod = {
   name: "toggleOnGod",
   desc: "Toggles responses to ongod related messages.",
   permissions: 10,
   usuage: "<true/false>",
   payload: commandPayload,
}

module.exports = toggleOnGod;