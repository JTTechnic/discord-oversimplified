"use strict";

const {join} = require("path");
const {token} = require("./auth.json");
const {Client} = require("../src");

const client = new Client({
	intents: [],
	token
});

client.commandsIn("./commands/");
client.commandsIn(join(__dirname, "./commands/"));
