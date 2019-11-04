'use strict'

function testFunction(sys, args) {
   sys.message.channel.send("THIS IS A TEST COMMAND!");
}

const test = {
   name: "test",
   desc: 'A command designed to test the command handler.',
   permissions: 0,
   usuage: '',
   payload: testFunction,

}

module.exports = test;