import { Variable } from "../Variable";
import type { Container } from "@sapphire/pieces";

module.exports = class SetUserVarVariable extends Variable {
	public constructor(container: Container) {
		super(container, "setuservar", (name: string, value: any, user: string, guild: string) => {
			const vars = this.container.databases.userVars.get(guild) ?? {};
			(vars[user] ??= {})[name] = value;
			this.container.databases.userVars.set(guild, vars);
		});
	}
};
