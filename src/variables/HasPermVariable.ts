import type { PieceContext } from "@sapphire/framework";
import type { GuildChannel, GuildMember, PermissionString } from "discord.js";
import { Variable, VariableOptions } from "../lib/structures/Variable";

export class HasPermVariable extends Variable {
	public constructor(context: PieceContext, options: VariableOptions) {
		super(context, {
			...options,
			name: "hasperm",
			definition: (member: GuildMember, permission: PermissionString, channel?: GuildChannel) => {
				return channel ? channel.permissionsFor(member).has(permission) : member.permissions.has(permission);
			}
		});
	}
}
