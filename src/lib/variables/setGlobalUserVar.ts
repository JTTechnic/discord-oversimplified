import { Variable } from "../Variable";
import type { Container } from "@sapphire/pieces";

module.exports = class SetGlobalUserVarVariable extends Variable {
	public constructor(container: Container) {
		super(container, "setglobaluservar", (name: string, value: any, user: string) => {
			const vars = this.container.databases.globalUserVars.get(user) ?? {};
			vars[name] = value;
			this.container.databases.globalUserVars.set(user, vars);
		});
	}
};
