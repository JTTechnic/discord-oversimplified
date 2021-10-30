import { Variable } from "../Variable";
import type { Client } from "../Client";

module.exports = class GetUserVarVariable extends Variable {
	public constructor(client: Client) {
		super(
			client,
			"getuservar",
			(name: string, user: string, guild: string) =>
				((this.client.databases.userVars.get(guild) ?? {})[user] ?? {})[name]
		);
	}
};
