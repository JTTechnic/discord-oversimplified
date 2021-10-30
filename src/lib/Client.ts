import Dext from "discord-extend";
import { Environment, evaluate, parse } from "@discordextend/interpreter";
import { resolve, join } from "node:path";
import requireAll from "require-all";
import { Builder } from "./Builder";
import { Database } from "./Database";
import type { Variable } from "./Variable";
import type {
	CommandInteraction,
	GuildMember,
	InteractionReplyOptions,
	TextChannel,
	WebhookEditMessageOptions
} from "discord.js";

export interface ClientOptions extends Dext.ClientOptions {
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

export class Client extends Dext.Client {
	public declare options: ClientOptions;
	/**
	 * The databases of this client
	 */
	public readonly databases = {
		vars: new Database("vars"),
		userVars: new Database<{
			[user: string]:
				| {
						[key: string]: any;
				  }
				| undefined;
		}>("uservars"),
		globalUserVars: new Database<{
			[key: string]: any;
		}>("globaluservars")
	};

	/**
	 * The environment of this client
	 */
	public readonly environment = new Environment();

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
				this.environment.define("messageoptions", {});
				this.setInteractionVariables(interaction);
				evaluate(parse(code), this.environment);
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
			const createdVariable = new variable(this) as Variable;
			this.environment.define(createdVariable.name, createdVariable.definition);
		});
		for (const name in this.options.customVariables) {
			if (this.options.customVariables.hasOwnProperty(name)) {
				this.environment.define(name, this.options.customVariables[name]);
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
		this.environment.define("user", interaction.user);
		this.environment.define("username", interaction.user.username);
		this.environment.define("userid", interaction.user.id);
		this.environment.define("tag", interaction.user.tag);
		this.environment.define("avatar", interaction.user.displayAvatarURL({ format: "png" }));
		this.environment.define("member", interaction.member);
		this.environment.define("nickname", (interaction.member as GuildMember).displayName);
		//
		// Guild data
		//
		this.environment.define("channel", interaction.channel);
		this.environment.define("channelname", (interaction.channel as TextChannel | null)?.name);
		this.environment.define("channelid", interaction.channelId);
		this.environment.define("guild", interaction.guild);
		this.environment.define("guildname", interaction.guild?.name);
		this.environment.define("guildid", interaction.guildId);
		//
		// Message sending
		//
		this.environment.define("defer", (ephemeral: boolean) => interaction.deferReply({ ephemeral }));
		this.environment.define("reply", (ephemeral: boolean) => {
			const messageOptions: InteractionReplyOptions = this.environment.get("messageoptions");
			messageOptions.ephemeral = ephemeral;
			return interaction.reply(messageOptions);
		});
		this.environment.define("edit", () =>
			interaction.editReply(this.environment.get("messageoptions") as WebhookEditMessageOptions)
		);
		this.environment.define("followup", (ephemeral: boolean) => {
			const messageOptions: InteractionReplyOptions = this.environment.get("messageoptions");
			messageOptions.ephemeral = ephemeral;
			return interaction.followUp(messageOptions);
		});
		//
		// Interaction options
		//
		this.environment.define("stringoption", (name: string, required: boolean) =>
			interaction.options.getString(name, required)
		);
		this.environment.define("booleanoption", (name: string, required: boolean) =>
			interaction.options.getBoolean(name, required)
		);
		this.environment.define("integeroption", (name: string, required: boolean) =>
			interaction.options.getInteger(name, required)
		);
		this.environment.define("channeloption", (name: string, required: boolean) =>
			interaction.options.getChannel(name, required)
		);
		this.environment.define("memberoption", (name: string, required: boolean) =>
			interaction.options.getMember(name, required)
		);
		this.environment.define("numberoption", (name: string, required: boolean) =>
			interaction.options.getNumber(name, required)
		);
		this.environment.define("roleoption", (name: string, required: boolean) =>
			interaction.options.getRole(name, required)
		);
		this.environment.define("useroption", (name: string, required: boolean) =>
			interaction.options.getUser(name, required)
		);
		this.environment.define("mentionableoption", (name: string, required: boolean) =>
			interaction.options.getMentionable(name, required)
		);
	}
}
