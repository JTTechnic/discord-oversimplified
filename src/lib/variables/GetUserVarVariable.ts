import { Variable } from "../Variable";

export class GetUserVarVariable extends Variable {
	public constructor() {
		super(
			"getuservar",
			(name: string, user: string, guild: string) =>
				((this.container.databases.userVars.get(guild) ?? {})[user] ?? {})[name]
		);
	}
}
