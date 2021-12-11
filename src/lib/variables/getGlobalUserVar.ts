import { Variable } from "../Variable";

module.exports = class GetGlobalUserVarVariable extends Variable {
	public constructor() {
		super(
			"getglobaluservar",
			(name: string, user: string) => (this.container.databases.globalUserVars.get(user) ?? {})[name]
		);
	}
};
