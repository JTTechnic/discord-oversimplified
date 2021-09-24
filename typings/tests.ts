import {Client, Builder} from ".";

const client = new Client({
	intents: [],
	token: "TOKEN"
});

const dextCommand = Builder.command(
	{
		name: "test",
		description: "A test command"
	},
	() => {}
);

client.command("test group sub", "test succeeded");
