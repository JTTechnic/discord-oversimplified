import { Variable } from "../Variable";
import type { Client } from "../Client";

module.exports = class SetUserVarVariable extends Variable {
	public constructor(client: Client) {
		super(client, "setuservar", (name: string, value: any, user: string, guild: string) => {
			const vars = this.client.databases.userVars.get(guild) ?? {};
			(vars[user] ??= {})[name] = value;
			this.client.databases.userVars.set(guild, vars);
		});
	}
};
