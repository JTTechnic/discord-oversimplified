import type { Guild, UserResolvable } from "discord.js";
import { Variable } from "../Variable";

export class UnbanVariable extends Variable {
	public constructor() {
		super("unban", (guild: Guild, user: UserResolvable, reason?: string) => {
			void guild.members.unban(user, reason);
		});
	}
}
