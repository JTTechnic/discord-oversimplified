import { Variable } from "../Variable";
import type { Container } from "@sapphire/pieces";

module.exports = class GetVarVariable extends Variable {
	public constructor(container: Container) {
		super(container, "getvar", (name: string) => this.container.databases.vars.get(name));
	}
};
