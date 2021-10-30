import { token } from "./auth.json";
import { Client } from "../dist";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const client = new Client({
	intents: [],
	token
});

test("command", () => {
	client.command(
		"test group sub",
		`
		content.set("override");
		embed();
		embed.color("RED");
		embed.description("test group sub");
		reply();
	`
	);
	expect(client.registry.commands.size).toBe(1);
	client.registry.commands.clear();
	expect(client.registry.commands.size).toBe(0);
});

test("command directory", () => {
	const commands = readdirSync(join(__dirname, "commands")).filter((file) => /^.*\.js$/.test(file)).length;
	client.commandsIn(join(__dirname, "commands"));
	expect(client.registry.commands.size).toBe(commands);
});
