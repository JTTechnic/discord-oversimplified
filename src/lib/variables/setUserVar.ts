import { Variable } from "../Variable";

module.exports = class SetUserVarVariable extends Variable {
	public constructor() {
		super("setuservar", (name: string, value: any, user: string, guild: string) => {
			const vars = this.container.databases.userVars.get(guild) ?? {};
			(vars[user] ??= {})[name] = value;
			this.container.databases.userVars.set(guild, vars);
		});
	}
};
