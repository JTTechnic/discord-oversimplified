import { resolve } from "node:path";
import requireAll from "require-all";
import type { ClientOptions } from "discord.js";
import { SapphireClient } from "@sapphire/framework";
import { Command, CommandOptions } from "./Command";

export class Client extends SapphireClient {
	public override login(token?: string) {
		if ("sapphireCommandPath" in this.options) {
			const { stores } = this;
			const commandStore = stores.get("commands");
			stores.registerPath();
			commandStore.paths.clear();
			if (this.options.sapphireCommandPath) commandStore.registerPath(resolve(this.options.sapphireCommandPath));
		}
		return super.login(token);
	}

	public constructor(options: ClientOptions) {
		if ("sapphireCommandPath" in options) {
			options.baseUserDirectory = null;
		}
		super(options);
	}

	/**
	 * Add a command
	 * @param trigger The full name of the command ~~(with subcommand and subcommand group name)~~
	 *
	 * **Note:** subcommand support is currently not available
	 * @param code The code to run when this event is triggered
	 */
	public command(trigger: string, code: string, options?: Omit<CommandOptions, "trigger" | "code">) {
		this.validateTrigger(trigger);
		const commandStore = this.stores.get("commands");
		const splitTrigger = trigger.split(" ");
		const command = commandStore.get(splitTrigger[0]) as Command | undefined;
		const commandOptions = { ...options, trigger: splitTrigger, code };
		if (!command) {
			return void commandStore.set(splitTrigger[0], new Command(this, commandOptions));
		}
		return void command.addCommand(commandOptions);
	}

	/**
	 * Add commands from a directory
	 * @param dir The directory to add commands from
	 */
	public commandsIn(dir: string) {
		dir = resolve(dir);
		Object.values(requireAll(dir)).map((command: CommandOptions & { trigger: string }) => {
			this.command(command.trigger, command.code, command);
		});
	}

	/**
	 * Validate a command trigger
	 * @param trigger The trigger to validate
	 */
	private validateTrigger(trigger: string) {
		const splitTrigger = trigger.split(" ");
		if (splitTrigger.some((triggerName) => !/^[\w-]*$/.test(triggerName))) {
			throw new Error("Trigger must use only letters, digits and -");
		}
		if (splitTrigger.some((triggerName) => triggerName.length < 1 || triggerName.length > 32)) {
			throw new Error("The length of trigger words must be between 1 and 32 characters");
		}
		if (splitTrigger.length > 3) {
			throw new Error("The trigger of a command can have no more than 3 words");
		}
	}
}

declare module "discord.js" {
	interface ClientOptions {
		/**
		 * Where sapphire commands should be loaded from, if not specified, the default path will be used
		 */
		sapphireCommandPath?: string | null;
	}
}
