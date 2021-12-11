import { ClientOptions as DextClientOptions, Client as DextClient } from "discord-extend";
import { evaluate, parse } from "@discordextend/interpreter";
import { resolve, join } from "node:path";
import requireAll from "require-all";
import { Builder } from "./Builder";
import type { Variable } from "./Variable";
import type {
	CommandInteraction,
	GuildMember,
	InteractionReplyOptions,
	TextChannel,
	WebhookEditMessageOptions
} from "discord.js";
import { container } from "@sapphire/framework";

export interface ClientOptions extends DextClientOptions {
	/**
	 * The token of this client
	 */
	token: string;
	/**
	 * The custom variables of this client
	 */
	customVariables?: {
		[name: string]: any;
	};
}

export class Client extends DextClient {
	public declare options: ClientOptions;

	/**
	 * Create a new client
	 * @param options The options of this client
	 */
	public constructor(options: ClientOptions) {
		super(options);

		if (typeof options.customVariables === "string") {
			options.customVariables = Object.values(requireAll(resolve(options.customVariables)));
		}

		this.options.customVariables = options.customVariables ?? {};

		this.initEnvironment();
		this.login(options.token).catch(console.error);
	}

	/**
	 * Add a command
	 * @param trigger The full name of the command (with subcommand and subcommand group name)
	 * @param code The code to run when this event is triggered
	 */
	public command(trigger: string, code: string) {
		this.validateTrigger(trigger);
		const command = Builder.command(
			{
				name: trigger,
				description: trigger
			},
			(interaction) => {
				container.environment.define("messageoptions", {});
				this.setInteractionVariables(interaction);
				evaluate(parse(code), container.environment);
			}
		);
		this.registry.registerCommands(command);
	}

	/**
	 * Add commands from a directory
	 * @param dir The directory to add commands from
	 */
	public commandsIn(dir: string) {
		dir = resolve(dir);
		Object.values(requireAll(dir)).forEach((command: { trigger: string; code: string }) => {
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

	/**
	 * Initialize environment variables
	 */
	private initEnvironment() {
		Object.values(requireAll(join(__dirname, "lib/variables"))).forEach((variable: any) => {
			const createdVariable = new variable() as Variable;
			container.environment.define(createdVariable.name, createdVariable.definition);
		});
		for (const name in this.options.customVariables) {
			if (this.options.customVariables.hasOwnProperty(name)) {
				container.environment.define(name, this.options.customVariables[name]);
			}
		}
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
		container.environment.define("nickname", (interaction.member as GuildMember).displayName);
		//
		// Guild data
		//
		container.environment.define("channel", interaction.channel);
		container.environment.define("channelname", (interaction.channel as TextChannel | null)?.name);
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
}
