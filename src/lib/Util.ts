import { container } from "@sapphire/framework";
import type {
	CommandInteraction,
	GuildMember,
	InteractionReplyOptions,
	TextChannel,
	WebhookEditMessageOptions
} from "discord.js";
import type { Variable } from "./Variable";

export class Util {
	public static defineVariable(...variables: Variable[]) {
		variables.forEach((variable) => container.environment.define(variable.name, variable.definition));
	}

	/**
	 * Set the interaction properties in the environment
	 * @param interaction The interaction to get the properties from
	 */
	public static setInteractionVariables(interaction: CommandInteraction) {
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
