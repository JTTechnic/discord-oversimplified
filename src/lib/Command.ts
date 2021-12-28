import { evaluate, parse } from "@discordextend/interpreter";
import { Command as SapphireCommand, container, Events } from "@sapphire/framework";
import { Collection, CommandInteraction } from "discord.js";
import type { Client } from "./Client";
import { Util } from "./Util";

export interface CommandOptions {
	trigger: string[];
	code: string;
}

export class Command extends SapphireCommand {
	private readonly commands: Collection<string, (interaction: CommandInteraction) => any> = new Collection();

	public constructor(public readonly client: Client, options: CommandOptions) {
		super(
			{
				root: "",
				path: "",
				name: "",
				store: container.stores.get("commands")
			},
			{
				name: options.trigger[0]
			}
		);
		this.addCommand(options);
	}

	private capitalize(string?: string) {
		return string ? `${string.charAt(0).toUpperCase()}${string.slice(1)}` : "";
	}

	private getTriggerName(trigger: string[]) {
		return `${trigger[0]}${this.capitalize(trigger[1])}${this.capitalize(trigger[2])}`;
	}

	public addCommand({ trigger, code }: CommandOptions) {
		this.commands.set(this.getTriggerName(trigger), (interaction) => {
			container.environment.define("messageoptions", {});
			Util.setInteractionVariables(interaction);
			evaluate(parse(code), container.environment);
		});
	}

	public override chatInputRun(interaction: CommandInteraction) {
		const commandName = this.getTriggerName([
			interaction.commandName,
			interaction.options.getSubcommandGroup(false) ?? "",
			interaction.options.getSubcommand(false) ?? ""
		]);
		const command = this.commands.get(commandName);
		if (command) return command(interaction);
		this.client.emit(Events.UnknownChatInputCommand, {
			context: { commandId: interaction.commandId, commandName },
			interaction
		});
	}
}
