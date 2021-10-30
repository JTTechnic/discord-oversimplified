import { Variable } from "../Variable";
import type { Client } from "../Client";

module.exports = class GetVarVariable extends Variable {
	public constructor(client: Client) {
		super(client, "getvar", (name: string) => this.client.databases.vars.get(name));
	}
};
