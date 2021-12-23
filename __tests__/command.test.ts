import { Client } from "../dist";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { container } from "@sapphire/framework";

const client = new Client({
	intents: []
});

const commandStore = container.stores.get("commands");

test("command", async () => {
	await client.command(
		"test group sub",
		`
		content.set("override");
		embed();
		embed.color("RED");
		embed.description("test group sub");
		reply();
	`
	);
	expect(commandStore.size).toBe(1);
	commandStore.clear();
	expect(commandStore.size).toBe(0);
});

test("command directory", async () => {
	const commands = readdirSync(join(__dirname, "commands")).filter((file) => /^.*\.js$/.test(file)).length;
	await client.commandsIn(join(__dirname, "commands"));
	expect(commandStore.size).toBe(commands);
});
