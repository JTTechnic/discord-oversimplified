import { Variable } from "../Variable";
import type { Client } from "../Client";

module.exports = class SetVarVariable extends Variable {
	public constructor(client: Client) {
		super(client, "setvar", (name: string, value: any) => {
			this.client.databases.vars.set(name, value);
		});
	}
};
