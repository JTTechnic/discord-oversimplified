import { SlashSubCommand, SlashSubCommandInfo } from "discord-extend";
import type { CommandInteraction } from "discord.js";

export class Builder {
	/**
	 * Make a new discord-extend subcommand
	 * @param options The options of the command
	 * @param runMethod The run method of the command
	 * @returns The created command
	 */
	public static command(
		options: SlashSubCommandInfo,
		runMethod: (interaction: CommandInteraction) => any
	): SlashSubCommand {
		return new (class extends SlashSubCommand {
			public constructor() {
				super(options);
			}

			public run(interaction: CommandInteraction) {
				runMethod(interaction);
			}
		})();
	}
}
