'use strict'

const path = require('path');
const util = require('util');
const fs = require('fs');

const readdir = util.promisify(fs.readdir);

const dirPath = path.join(__dirname, "commands");
const dirPath2 = path.join(__dirname, "syscommands");

async function loadCommands() {

   let commandMap = {};

   let files;

   try {
      files = await readdir(dirPath);
      const sfiles = await readdir(dirPath2);
      files = [...files, ...sfiles];
   } catch (err) {
      console.log(err);
   }

   files.forEach(file => {

      let command;
      
      if (file.startsWith("sys_"))
         command = require(dirPath2 + path.sep + file);
      else
         command = require(dirPath + path.sep + file);

      commandMap = {...commandMap, [command.name]: command };
   });

   return commandMap;
}

module.exports = loadCommands();