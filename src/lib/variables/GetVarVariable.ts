import { Variable } from "../Variable";

export class GetVarVariable extends Variable {
	public constructor() {
		super("getvar", (name: string) => this.container.databases.vars.get(name));
	}
}
