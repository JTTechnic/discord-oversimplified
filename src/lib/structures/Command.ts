import { evaluate, parse } from "@discordextend/interpreter";
import { Command as SapphireCommand, container, Events } from "@sapphire/framework";
import {
	CommandInteraction,
	GuildMember,
	InteractionReplyOptions,
	Snowflake,
	WebhookEditMessageOptions
} from "discord.js";
import { Collection } from "@discordjs/collection";
import type { Client } from "../Client";

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

	public addCommand({ trigger, code, cooldown = 0, globalCooldown = 0, cooldownError }: CommandOptions): void {
		const triggerName = this.getTriggerName(trigger);
		this.commands.set(triggerName, (interaction) => {
			console.log("Time to check cooldowns");

			// Cooldown check
			const { id: userId } = interaction.user;
			const cooldowns = this.cooldowns.ensure(triggerName, () => new Collection());
			const timeleft = Math.max(
				this.getCooldown(this.globalCooldowns, userId),
				this.getCooldown(cooldowns, userId)
			);
			if (timeleft > 0) {
				return interaction.reply({
					content:
						cooldownError ??
						`You must wait ${Math.ceil(timeleft / 1000)} seconds before using this command again.`,
					ephemeral: true
				});
			}

			console.log("Time to execute!");

			// Command execution
			container.environment.define("messageoptions", {});
			this.setInteractionVariables(interaction);
			evaluate(parse(code), container.environment);

			// Cooldown set
			const now = Date.now();
			this.globalCooldowns.set(userId, now + globalCooldown);
			return cooldowns.set(userId, now + cooldown);
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

	private capitalize(string?: string) {
		return string ? `${string.charAt(0).toUpperCase()}${string.slice(1)}` : "";
	}

	private getTriggerName(trigger: string[]) {
		return `${trigger[0]}${this.capitalize(trigger[1])}${this.capitalize(trigger[2])}`;
	}

	/**
	 * Set the interaction properties in the environment
	 * @param interaction The interaction to get the properties from
	 */
	private setInteractionVariables(interaction: CommandInteraction) {
		//
		// User data
		//
		container.environment.define("user", interaction.user);
		container.environment.define("username", interaction.user.username);
		container.environment.define("userid", interaction.user.id);
		container.environment.define("tag", interaction.user.tag);
		container.environment.define("avatar", interaction.user.displayAvatarURL({ format: "png" }));
		container.environment.define("member", interaction.member);
		container.environment.define(
			"nickname",
			interaction.member instanceof GuildMember ? interaction.member.displayName : undefined
		);
		//
		// Guild data
		//
		container.environment.define("channel", interaction.channel);
		container.environment.define(
			"channelname",
			interaction.channel?.isText() && interaction.channel.type !== "DM" ? interaction.channel.name : undefined
		);
		container.environment.define("channelid", interaction.channelId);
		container.environment.define("guild", interaction.guild);
		container.environment.define("guildname", interaction.guild?.name);
		container.environment.define("guildid", interaction.guildId);
		//
		// Message sending
		//
		container.environment.define("defer", (ephemeral: boolean) => interaction.deferReply({ ephemeral }));
		container.environment.define("reply", (ephemeral: boolean) => {
			const messageOptions: InteractionReplyOptions = container.environment.get("messageoptions");
			messageOptions.ephemeral = ephemeral;
			return interaction.reply(messageOptions);
		});
		container.environment.define("edit", () =>
			interaction.editReply(container.environment.get("messageoptions") as WebhookEditMessageOptions)
		);
		container.environment.define("followup", (ephemeral: boolean) => {
			const messageOptions: InteractionReplyOptions = container.environment.get("messageoptions");
			messageOptions.ephemeral = ephemeral;
			return interaction.followUp(messageOptions);
		});
		//
		// Interaction options
		//
		container.environment.define("stringoption", (name: string, required: boolean) =>
			interaction.options.getString(name, required)
		);
		container.environment.define("booleanoption", (name: string, required: boolean) =>
			interaction.options.getBoolean(name, required)
		);
		container.environment.define("integeroption", (name: string, required: boolean) =>
			interaction.options.getInteger(name, required)
		);
		container.environment.define("channeloption", (name: string, required: boolean) =>
			interaction.options.getChannel(name, required)
		);
		container.environment.define("memberoption", (name: string, required: boolean) =>
			interaction.options.getMember(name, required)
		);
		container.environment.define("numberoption", (name: string, required: boolean) =>
			interaction.options.getNumber(name, required)
		);
		container.environment.define("roleoption", (name: string, required: boolean) =>
			interaction.options.getRole(name, required)
		);
		container.environment.define("useroption", (name: string, required: boolean) =>
			interaction.options.getUser(name, required)
		);
		container.environment.define("mentionableoption", (name: string, required: boolean) =>
			interaction.options.getMentionable(name, required)
		);
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
}
