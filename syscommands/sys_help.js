'use strict'

function commandPayload(sys, cmdmap, args) {
   
   if (args.length == 0) {
      sys.message.channel.send("Here you go: http://fantasy.works/");
      return;
   }

   const commandQueue = [];

   args.forEach(val => {

      if (commandQueue.includes(val)) return;

      commandQueue.push(val);

      const ogVal = val;

      if (cmdmap[val] == undefined) {
         val = "system_" + val;
      }

      console.log("Getting help for " + val);


      try {

         const c = cmdmap[val];

         const usuage = c.usuage || "";
         const desc = c.desc || "No Description Provided.";
         const perms = c.permissions || "No Permissions Required.";
         const crtr = c.author ? "\n\n**Author**: " + c.author : "";

         sys.message.channel.send(`>>> __${val}__\n\n**Usuage**: ${sys.settings.get().prefix}${val} ${usuage}\n\n**Description**: ${desc}\n\n**Permissions**: ${perms}${crtr}`);
      } catch (e) {
         sys.message.channel.send("Command \"" + ogVal + "\" does not exist.");
      }

   });

}

const system_help = {
   name: "system_help",
   desc: "Gets documentation about a command.",
   permissions: 0,
   usuage: "<command...>",
   payload: commandPayload,
   author: "System",
}

module.exports = system_help;