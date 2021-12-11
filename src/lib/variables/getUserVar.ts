import { Variable } from "../Variable";

module.exports = class GetUserVarVariable extends Variable {
	public constructor() {
		super(
			"getuservar",
			(name: string, user: string, guild: string) =>
				((this.container.databases.userVars.get(guild) ?? {})[user] ?? {})[name]
		);
	}
};
