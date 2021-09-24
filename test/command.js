"use strict";

const {token} = require("./auth.json");
const {Client} = require("../src");

const client = new Client({
	intents: [],
	token
});

client.command("test group sub", "pong");
client.command("test sub", "pong 2");
