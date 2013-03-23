#!/usr/bin/env node

var program = require('commander'); //Commandline option support.
var packageJson = require('./package.json'); //Grab the data from the package.json file.

program
  .version(packageJson.version) //Dynamic verison number based on version in package.json
  .option('-w, --hello', 'Print hello world')
	.parse(process.argv);

if(program.hello)
	console.log('Hello World!');
else
	program.help();
