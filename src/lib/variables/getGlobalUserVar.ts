import type { Container } from "@sapphire/pieces";
import { Variable } from "../Variable";

module.exports = class GetGlobalUserVarVariable extends Variable {
	public constructor(container: Container) {
		super(
			container,
			"getglobaluservar",
			(name: string, user: string) => (this.container.databases.globalUserVars.get(user) ?? {})[name]
		);
	}
};
