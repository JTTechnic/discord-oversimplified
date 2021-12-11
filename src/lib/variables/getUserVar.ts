import { Variable } from "../Variable";
import type { Container } from "@sapphire/pieces";

module.exports = class GetUserVarVariable extends Variable {
	public constructor(container: Container) {
		super(
			container,
			"getuservar",
			(name: string, user: string, guild: string) =>
				((this.container.databases.userVars.get(guild) ?? {})[user] ?? {})[name]
		);
	}
};
