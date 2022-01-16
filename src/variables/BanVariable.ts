import type { PieceContext } from "@sapphire/framework";
import type { BanOptions, GuildMember } from "discord.js";
import { Variable, VariableOptions } from "../lib/structures/Variable";

export class BanVariable extends Variable {
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, {
			...options,
			name: "ban",
			definition: (member: GuildMember, reason?: string, days?: number) => {
				const options: BanOptions = {};
				if (reason) options.reason = reason;
				if (days) options.days = days;
				void member.ban(options);
			}
		});
	}
}
