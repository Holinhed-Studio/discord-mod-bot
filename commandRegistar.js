'use strict'

const path = require('path');
const util = require('util');
const fs = require('fs');

const readdir = util.promisify(fs.readdir);

const dirPath = path.join(__dirname, "commands");

async function loadCommands() {

   let commandMap = {};

   let files;

   try {
      files = await readdir(dirPath);
   } catch (err) {
      console.log(err);
   }

   files.forEach(file => {
      const command = require(dirPath + path.sep + file);
      commandMap = {...commandMap, [command.name]: command };
   });

   return commandMap;
}

module.exports = loadCommands();