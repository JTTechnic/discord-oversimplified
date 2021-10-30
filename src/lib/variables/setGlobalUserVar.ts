import { Variable } from "../Variable";
import type { Client } from "../Client";

module.exports = class SetGlobalUserVarVariable extends Variable {
	public constructor(client: Client) {
		super(client, "setglobaluservar", (name: string, value: any, user: string) => {
			const vars = this.client.databases.globalUserVars.get(user) ?? {};
			vars[name] = value;
			this.client.databases.globalUserVars.set(user, vars);
		});
	}
};
