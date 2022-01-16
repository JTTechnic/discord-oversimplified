import type { PieceContext } from "@sapphire/framework";
import { Guild, GuildMember, Snowflake } from "discord.js";
import { Variable, VariableOptions } from "../structures/Variable";

export class IsOwnerVariable extends Variable {
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, {
			...options,
			name: "isowner",
			definition: (guild: Guild, member: GuildMember | Snowflake) => {
				const memberId = member instanceof GuildMember ? member.id : member;
				return guild.ownerId === memberId;
			}
		});
	}
}
