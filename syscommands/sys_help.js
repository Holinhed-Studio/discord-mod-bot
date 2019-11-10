'use strict'

function findPermName(settings,num) {

   const permLevels = settings.permlevels;

   for (let val in permLevels) {
      if (permLevels[val] == num) return val; 
   }

   return "NONE";
}

function commandPayload(sys, cmdmap, args) {
   
   if (args.length == 0) {
      sys.message.reply("Here you go: http://fantasy.works/");
      return;
   }

   const commandQueue = [];
   let iter = 0;

   args.forEach(val => {

      if (commandQueue.includes(val)) return;
      
      if (iter == 5) return;
      
      iter++;

      commandQueue.push(val);

      const ogVal = val;

      if (cmdmap[val] == undefined) {
         val = "system_" + val;
      }

      //console.log("Getting help for " + val);

      try {
         const c = cmdmap[val];
         const usuage = c.usuage || "";
         const desc = c.desc || "No Description Provided.";

         let perms;

         if (c.permissions) {
            perms = c.permissions;

            const permRank = findPermName(sys.settings.get(), c.permissions)

            if (permRank != "NONE") {
               perms += ` (${permRank})`;
            }

         } else {
            perms = "No Permissions Required.";
         }

         //const crtr = c.author ? "\n\n**Author**: " + c.author : "";

         //sys.message.channel.send(`>>> __${val}__\n\n**Usuage**: ${sys.settings.get().prefix}${val} ${usuage}\n\n**Description**: ${desc}\n\n**Permissions**: ${perms}${crtr}`);
      
         const richembed = new sys.discord.RichEmbed()
         .setColor('#0xff3136')
         .setTitle(val)
         .setDescription(desc)
         .addField("Usuage", `${sys.settings.get().prefix}${val} ${usuage}`, false)
         .addField("Permissions", `${perms}`, false)
         .setTimestamp()

         if (c.author) {
            richembed.addField("Author", c.author, false)
         }

         sys.message.channel.send(richembed);

      } catch (e) {
         sys.message.channel.send("Command \"" + ogVal + "\" does not exist.");
      }

   });

}

const system_help = {
   name: "system_help",
   desc: "Gets documentation about a command.",
   permissions: 1,
   usuage: "<command...>",
   payload: commandPayload,
   author: "System",
}

module.exports = system_help;