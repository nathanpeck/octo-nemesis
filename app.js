#!/usr/bin/env node

var program = require('commander'); //Commandline option support.
var packageJson = require('./package.json'); //Grab the data from the package.json file.
var http = require('http');
var fs = require('fs');

program
  .version(packageJson.version) //Dynamic verison number based on version in package.json
  .option('-d, --dbconn', 'Test connection')
  .option('-i, --instagram <action>', 'Instagram integration [server] to start O-Auth component')
	.parse(process.argv);

if(program.instagram)
{
	if(program.instagram.length === 0)
	{
		//Output usage details.
		console.log('\nYou must specify one of the following actions to integrate with Instagram:\n');
		console.log('  server  -   Start a server for doing an OAuth with Instagram to get API credentials');
		console.log('  scan    -   Scan Instagram for new photos not in your stream yet.');
		console.log('              Requires OAuth tokens for API access.\n');
	}
	else
	{
		if(program.instagram[0] == 'server')
		{
			//Start up an Instagram OAuth Server component.
			var express = require('express');
			var app = express();

			app.use(express.static('static'));

			app.get('/', function(req, res){
				res.send('hello world');
			});

			app.listen(3000);
		}
	}
}
else if(program.dbconn)
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
{
	program.help();
}

