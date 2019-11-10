'use strict'

const testPerms = require('../tools/permfinder.js');

function testFunction(sys, args) {
   
   if (args.length == 0) return 2;

   let id = args[0];

   const perml = testPerms.fromId(id, sys.settings.get(), sys.message);

   sys.message.channel.send("This user's permission level is: " + perml);
}

const testp = {
   name: "testPerms",
   desc: 'Tests the testpermID command.',
   permissions: 666,
   usuage: '<id>',
   payload: testFunction,

}

module.exports = testp;