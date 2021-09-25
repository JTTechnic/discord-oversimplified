import {Client, Builder, Variable} from ".";

const client = new Client({
	intents: [],
	token: "TOKEN",
	customVariables: [class extends Variable {}] //"dir"
});

const dextCommand = Builder.command(
	{
		name: "test",
		description: "A test command"
	},
	() => {}
);

client.command("test group sub", "test succeeded");
client.commandsIn("./commands/");
