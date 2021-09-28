import {Client, Builder} from ".";

const client = new Client({
	intents: [],
	token: "TOKEN",
	customVariables: {
		print: (message: string) => {
			console.log(message);
		}
	}
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
