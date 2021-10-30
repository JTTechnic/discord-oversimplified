import { Builder } from "../dist";
import { SlashSubCommand } from "discord-extend";

test("command", () => {
	const command = Builder.command({ name: "command", description: "command" }, () => {
		console.log("test success");
	});
	expect(command).toBeInstanceOf(SlashSubCommand);
	expect(command.run).not.toThrow();
});
