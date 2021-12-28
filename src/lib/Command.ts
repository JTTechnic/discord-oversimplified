import { evaluate, parse } from "@discordextend/interpreter";
import { Command as SapphireCommand, container, Events } from "@sapphire/framework";
import type { CommandInteraction, Snowflake } from "discord.js";
import { Collection } from "@discordjs/collection";
import type { Client } from "./Client";
import { Util } from "./Util";

export interface CommandOptions {
	trigger: string[];
	code: string;
	cooldown?: number;
	globalCooldown?: number;
	cooldownError?: string;
}

export class Command extends SapphireCommand {
	private readonly commands: Collection<string, (interaction: CommandInteraction) => any> = new Collection();
	private readonly cooldowns: Collection<string, Collection<Snowflake, number>> = new Collection();
	private readonly globalCooldowns: Collection<string, number> = new Collection();

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

	public addCommand({ trigger, code, cooldown = 0, globalCooldown = 0, cooldownError }: CommandOptions) {
		const triggerName = this.getTriggerName(trigger);
		this.commands.set(triggerName, (interaction) => {
			console.log("Time to check cooldowns");

			// Cooldown check
			const { id: userId } = interaction.user;
			const cooldowns = this.cooldowns.ensure(triggerName, () => new Collection());
			const timeleft = Math.max(this.getCooldown(this.globalCooldowns, userId), this.getCooldown(cooldowns, userId));
			if (timeleft > 0) {
				return interaction.reply({
					content:
						cooldownError ?? `You must wait ${Math.ceil(timeleft / 1000)} seconds before using this command again.`,
					ephemeral: true
				});
			}

			console.log("Time to execute!");

			// Command execution
			container.environment.define("messageoptions", {});
			Util.setInteractionVariables(interaction);
			evaluate(parse(code), container.environment);

			// Cooldown set
			const now = Date.now();
			this.globalCooldowns.set(userId, now + globalCooldown);
			return cooldowns.set(userId, now + cooldown);
		});
	}

	private getCooldown(cooldowns: Collection<Snowflake, number>, userId: Snowflake) {
		if (cooldowns.has(userId)) {
			const cooldown = cooldowns.get(userId);
			const now = Date.now();
			if (cooldown && cooldown > now) {
				return cooldown - now;
			}
		}
		return 0;
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
