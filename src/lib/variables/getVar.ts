import { Variable } from "../Variable";

module.exports = class GetVarVariable extends Variable {
	public constructor() {
		super("getvar", (name: string) => this.container.databases.vars.get(name));
	}
};
