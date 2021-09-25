"use strict";

const {token} = require("./auth.json");
const {Client} = require("../src");

const client = new Client({
	intents: [],
	token
});

client.command(
	"test group sub",
	`
	hey
	embed();
	embed.color(RED);
	embed.description(test group sub);
`
);
client.command(
	"test sub",
	`
	embed();
	embed.color(GREEN);
	embed.description(test sub 1);
`
);
