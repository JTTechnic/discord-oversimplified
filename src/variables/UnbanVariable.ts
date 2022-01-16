import type { PieceContext } from "@sapphire/framework";
import type { Guild, UserResolvable } from "discord.js";
import { Variable, VariableOptions } from "../lib/structures/Variable";

export class UnbanVariable extends Variable {
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, {
			...options,
			name: "unban",
			definition: (guild: Guild, user: UserResolvable, reason?: string) => {
				void guild.members.unban(user, reason);
			}
		});
	}
}
