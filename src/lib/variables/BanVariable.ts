import type { BanOptions, GuildMember } from "discord.js";
import { Variable } from "../Variable";

export class BanVariable extends Variable {
	public constructor() {
		super("ban", (member: GuildMember, reason?: string, days?: number) => {
			const options: BanOptions = {};
			if (reason) options.reason = reason;
			if (days) options.days = days;
			void member.ban(options);
		});
	}
}
