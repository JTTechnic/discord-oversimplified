import type { GuildMember } from "discord.js";
import { Variable } from "../Variable";

export class KickVariable extends Variable {
	public constructor() {
		super("kick", (member: GuildMember, reason?: string) => {
			void member.kick(reason);
		});
	}
}
