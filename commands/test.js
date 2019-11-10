'use strict'

function testFunction(sys, args) {
   sys.message.channel.send("THIS IS A TEST COMMAND!");

   const exampleEmbed = new discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addField('Regular field title', 'Some value here')
	.addBlankField()
	.addField('Inline field title', 'Some value here', true)
	.addField('Inline field title', 'Some value here', true)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
   .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
   
   sys.message.channel.send(exampleEmbed);
}

const test = {
   name: "test",
   desc: 'A command designed to test the command handler.',
   permissions: 666,
   usuage: '',
   payload: testFunction,

}

module.exports = test;