import { Variable } from "../Variable";
import type { Container } from "@sapphire/pieces";

module.exports = class SetVarVariable extends Variable {
	public constructor(container: Container) {
		super(container, "setvar", (name: string, value: any) => {
			this.container.databases.vars.set(name, value);
		});
	}
};
