'use strict'

async function commandPayload(sys, args) {
   
   const usrId = args.length == 0 ? sys.message.author.id : args[0];

   sys.bot.fetchUser(usrId)
   .then((usr) => {
      console.log(usr);
      sys.message.channel.send("```javascript\n" + usr + "\n```");
   }) 
   
}

const setPrefix = {
   name: "fetchUser",
   desc: "Gets the user object from user ID.",
   permissions: 10,
   usuage: "<?userId>",
   payload: commandPayload,
}

module.exports = setPrefix;