"use strict";

const {token} = require("./auth.json");
const {Client, Variable} = require("../src");

const client = new Client({
	intents: [],
	token,
	customVariables: [
		class extends Variable {
			constructor(interpeter) {
				super(interpeter, "content");
			}

			construct(content) {
				this.interpeter.variables.content = content;
			}
		}
	]
});

client.command(
	"test group sub",
	`
	hey
	content(override);
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
