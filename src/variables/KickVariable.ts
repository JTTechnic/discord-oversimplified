import type { PieceContext } from "@sapphire/framework";
import type { GuildMember } from "discord.js";
import { Variable, VariableOptions } from "../lib/structures/Variable";

export class KickVariable extends Variable {
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, {
			...options,
			name: "kick",
			definition: (member: GuildMember, reason?: string) => {
				void member.kick(reason);
			}
		});
	}
}
