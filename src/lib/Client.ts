import { resolve } from "node:path";
import requireAll from "require-all";
import type { ClientOptions } from "discord.js";
import { container, SapphireClient } from "@sapphire/framework";
import { Command } from "./Command";

export class Client extends SapphireClient {
	public override login(token?: string) {
		if (!this.options.defaultCommandPath) {
			container.stores.get("commands").registerPath(resolve("sapphireCommands"));
		}
		return super.login(token);
	}

	public constructor(options: ClientOptions) {
		if (!options.defaultCommandPath) {
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
	public command(trigger: string, code: string) {
		this.validateTrigger(trigger);
		const commandStore = container.stores.get("commands");
		const splitTrigger = trigger.split(" ");
		const command = commandStore.get(splitTrigger[0]) as Command | undefined;
		if (!command) {
			return void commandStore.set(splitTrigger[0], new Command(this, { trigger: splitTrigger, code }));
		}
		return void command.addCommand({ trigger: splitTrigger, code });
	}

	/**
	 * Add commands from a directory
	 * @param dir The directory to add commands from
	 */
	public commandsIn(dir: string) {
		dir = resolve(dir);
		Object.values(requireAll(dir)).map((command: { trigger: string; code: string }) => {
			this.command(command.trigger, command.code);
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
		 * Wether the default command path should be used to register sapphire commands
		 * @default false
		 */
		defaultCommandPath?: boolean;
	}
}
