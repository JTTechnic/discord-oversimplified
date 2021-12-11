import { Variable } from "../Variable";

module.exports = class SetGlobalUserVarVariable extends Variable {
	public constructor() {
		super("setglobaluservar", (name: string, value: any, user: string) => {
			const vars = this.container.databases.globalUserVars.get(user) ?? {};
			vars[name] = value;
			this.container.databases.globalUserVars.set(user, vars);
		});
	}
};
