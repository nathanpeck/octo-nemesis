#!/usr/bin/env node

var program = require('commander'); //Commandline option support.
var packageJson = require('./package.json'); //Grab the data from the package.json file.

program
  .version(packageJson.version) //Dynamic verison number based on version in package.json
  .option('-d, --dbconn', 'Test connection')
  .option('-w, --hello', 'Print hello world')
	.parse(process.argv);

if(program.hello)
	console.log('Hello World!');
if(program.dbconn)
{
	var MongoClient = require('mongodb').MongoClient , Server = require('mongodb').Server;
	var mongoClient = new MongoClient(new Server('localhost', 27017));
	
	mongoClient.open(function(err, mongoClient) {
	  var db1 = mongoClient.db("octo-nemesis");
	  console.log("test");
	
	  mongoClient.close();
	});
}
else
	program.help();
