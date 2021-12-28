import { Guild, GuildMember, Snowflake } from "discord.js";
import { Variable } from "../Variable";

export class IsOwnerVariable extends Variable {
	public constructor() {
		super("isowner", (guild: Guild, member: GuildMember | Snowflake) => {
			const memberId = member instanceof GuildMember ? member.id : member;
			return guild.ownerId === memberId;
		});
	}
}
