import type { Client } from "../Client";
import { Variable } from "../Variable";

module.exports = class GetGlobalUserVarVariable extends Variable {
	public constructor(client: Client) {
		super(
			client,
			"getglobaluservar",
			(name: string, user: string) => (this.client.databases.globalUserVars.get(user) ?? {})[name]
		);
	}
};
