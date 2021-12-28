import type { GuildChannel, GuildMember, PermissionString } from "discord.js";
import { Variable } from "../Variable";

export class HasPermVariable extends Variable {
	public constructor() {
		super("hasperm", (member: GuildMember, permission: PermissionString, channel?: GuildChannel) => {
			return channel ? channel.permissionsFor(member).has(permission) : member.permissions.has(permission);
		});
	}
}
